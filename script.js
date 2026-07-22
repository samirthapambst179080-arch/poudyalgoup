(function () {
  'use strict';

  const PAGE = document.body.dataset.page || 'home';
  const IS_SIGNIN_PAGE = window.location.pathname.includes('signin.html');

  const profile = JSON.parse(localStorage.getItem('netflixProfile'));
  if (!IS_SIGNIN_PAGE && (!profile || !profile.signedIn)) {
    window.location.replace('signin.html');
    return;
  }

  if (!IS_SIGNIN_PAGE && profile) {
    document.querySelectorAll('.profile-email').forEach(el => { el.textContent = profile.email; });
    document.querySelectorAll('.profile-name').forEach(el => { el.textContent = profile.displayName || 'User'; });
  }

  let myList = JSON.parse(localStorage.getItem('netflixMyList')) || [];
  let likedMovies = JSON.parse(localStorage.getItem('netflixLiked')) || [];

  const loadingScreen = document.getElementById('loading-screen');
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const searchToggle = document.getElementById('search-toggle');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchGrid = document.getElementById('search-grid');
  const noResults = document.getElementById('no-results');
  const movieRows = document.getElementById('movie-rows');
  const myListSection = document.getElementById('mylist-section');
  const myListGrid = document.getElementById('mylist-grid');
  const continueRow = document.getElementById('continue-row');
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const modal = document.getElementById('movie-modal');
  const modalPosterImg = document.getElementById('modal-poster-img');
  const modalTitle = document.getElementById('modal-title');
  const modalYear = document.getElementById('modal-year');
  const modalRating = document.getElementById('modal-rating');
  const modalDuration = document.getElementById('modal-duration');
  const modalDescription = document.getElementById('modal-description');
  const modalCast = document.getElementById('modal-cast');
  const modalGenres = document.getElementById('modal-genres');
  const modalRatingText = document.getElementById('modal-rating-text');
  const profileDropdown = document.getElementById('profile-dropdown');

  function createMovieCard(movie, options = {}) {
    const { compact, progress } = options;
    const isInList = myList.includes(movie.id);
    const isLiked = likedMovies.includes(movie.id);

    const card = document.createElement('div');
    card.className = 'movie-card reveal';
    card.setAttribute('data-id', movie.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${movie.title} - Click for details`);

    card.innerHTML = `
      <img class="movie-card-poster loading" src="${movie.poster}" alt="${movie.title}" loading="lazy" onload="this.classList.remove('loading')">
      <div class="movie-card-overlay">
        <div class="movie-card-title">${movie.title}</div>
        <div class="movie-card-meta">
          <span class="movie-card-rating">${getRatingStars(movie.id)}</span>
          <span>${movie.year}</span>
          <span>${movie.duration}</span>
        </div>
        <div class="movie-card-genre">${movie.genre}</div>
        <div class="movie-card-actions">
          <button class="btn-icon" data-action="play" aria-label="Play ${movie.title}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <button class="btn-icon ${isInList ? 'active' : ''}" data-action="add" aria-label="${isInList ? 'Remove from' : 'Add to'} My List">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="${isInList ? 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' : 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'}"/></svg>
          </button>
          <button class="btn-icon ${isLiked ? 'active' : ''}" data-action="like" aria-label="${isLiked ? 'Unlike' : 'Like'}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"/></svg>
          </button>
        </div>
        ${progress !== undefined ? `<div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>` : ''}
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-icon')) return;
      openModal(movie);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (e.target.closest('.btn-icon')) return;
        openModal(movie);
      }
    });

    card.querySelectorAll('.btn-icon').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleCardAction(btn.dataset.action, movie, btn);
      });
    });

    return card;
  }

  function handleCardAction(action, movie, btn) {
    switch (action) {
      case 'play': openModal(movie); break;
      case 'add': toggleMyList(movie, btn); break;
      case 'like': toggleLike(movie, btn); break;
    }
  }

  function toggleMyList(movie, btn) {
    const idx = myList.indexOf(movie.id);
    if (idx === -1) {
      myList.push(movie.id);
      btn.classList.add('active');
      btn.querySelector('svg').innerHTML = '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>';
    } else {
      myList.splice(idx, 1);
      btn.classList.remove('active');
      btn.querySelector('svg').innerHTML = '<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>';
    }
    localStorage.setItem('netflixMyList', JSON.stringify(myList));
    renderMyList();
  }

  function toggleLike(movie, btn) {
    const idx = likedMovies.indexOf(movie.id);
    if (idx === -1) {
      likedMovies.push(movie.id);
      btn.classList.add('active');
    } else {
      likedMovies.splice(idx, 1);
      btn.classList.remove('active');
    }
    localStorage.setItem('netflixLiked', JSON.stringify(likedMovies));
  }

  function renderRows(categories) {
    categories.forEach(cat => {
      const movies = getMoviesByCategory(cat.id);
      const rowContainer = document.getElementById(`row-${cat.id}`);
      if (!rowContainer) return;
      const scrollEl = rowContainer.querySelector('.row-scroll');
      if (!scrollEl) return;
      scrollEl.innerHTML = '';
      movies.forEach(movie => {
        scrollEl.appendChild(createMovieCard(movie));
      });
    });
  }

  function renderMyList() {
    if (!myListSection || !myListGrid) return;
    const listMovies = MOVIES.filter(m => myList.includes(m.id));
    if (listMovies.length > 0) {
      myListSection.classList.add('active');
    } else {
      myListSection.classList.remove('active');
    }
    myListGrid.innerHTML = '';
    listMovies.forEach(movie => {
      myListGrid.appendChild(createMovieCard(movie));
    });
  }

  function renderContinueWatching() {
    if (!continueRow) return;
    const continueData = JSON.parse(localStorage.getItem('netflixContinue')) || [];
    if (continueData.length === 0) {
      const cw = document.getElementById('continue-watching');
      if (cw) cw.style.display = 'none';
      return;
    }
    const cw = document.getElementById('continue-watching');
    if (cw) cw.style.display = 'block';
    continueRow.innerHTML = '';
    continueData.forEach(item => {
      const movie = MOVIES.find(m => m.id === item.id);
      if (movie) {
        continueRow.appendChild(createMovieCard(movie, { compact: true, progress: item.progress }));
      }
    });
  }

  function performSearch(query) {
    if (!searchGrid || !searchResults || !movieRows || !noResults) return;
    const q = query.toLowerCase().trim();
    searchGrid.innerHTML = '';
    if (!q) {
      searchResults.classList.add('hidden');
      movieRows.classList.remove('hidden');
      return;
    }
    const results = MOVIES.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.genre.toLowerCase().includes(q) ||
      m.cast.toLowerCase().includes(q)
    );
    if (results.length === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
      results.forEach(movie => {
        searchGrid.appendChild(createMovieCard(movie));
      });
    }
    movieRows.classList.add('hidden');
    searchResults.classList.remove('hidden');
    setTimeout(() => {
      searchGrid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }, 50);
  }

  function openModal(movie) {
    if (!modal) return;
    const colors = ['#1a1a2e', '#16213e', '#0f3460', '#1a1a2e', '#2d1b69', '#1e3a5f', '#4a1942'];
    const color = colors[movie.id % colors.length];
    modalPosterImg.src = movie.poster;
    modalPosterImg.alt = movie.title;
    modalTitle.textContent = movie.title;
    modalYear.textContent = movie.year;
    modalRating.textContent = movie.rating;
    modalDuration.textContent = movie.duration;
    modalDescription.textContent = movie.description;
    modalCast.textContent = movie.cast;
    modalGenres.textContent = movie.genre;
    modalRatingText.textContent = getRatingStars(movie.id) + ' / 5.0';
    document.querySelector('.modal-backdrop-img').style.background = `linear-gradient(135deg, ${color}, ${color}dd)`;

    const addBtn = modal.querySelector('.modal-add-btn');
    const isInList = myList.includes(movie.id);
    addBtn.classList.toggle('active', isInList);

    const likeBtn = modal.querySelector('.modal-like-btn');
    const isLiked = likedMovies.includes(movie.id);
    likeBtn.classList.toggle('active', isLiked);

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function setupRowScrolling() {
    document.querySelectorAll('.movie-row').forEach(row => {
      const container = row.querySelector('.row-container');
      const scrollEl = row.querySelector('.row-scroll');
      const prevBtn = row.querySelector('.prev-btn');
      const nextBtn = row.querySelector('.next-btn');
      if (!prevBtn || !nextBtn) return;
      prevBtn.addEventListener('click', () => {
        scrollEl.scrollBy({ left: -container.offsetWidth * 0.6, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        scrollEl.scrollBy({ left: container.offsetWidth * 0.6, behavior: 'smooth' });
      });
    });
  }

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  function handleScrollToTopVisibility() {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }

  function handleScrollReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
    hamburger.setAttribute('aria-expanded', isExpanded);
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function toggleSearch() {
    if (!searchInput) return;
    searchInput.classList.toggle('active');
    if (searchInput.classList.contains('active')) {
      searchInput.focus();
    } else {
      searchInput.value = '';
      performSearch('');
    }
  }

  function toggleProfileDropdown() {
    profileDropdown.classList.toggle('open');
    const btn = profileDropdown.querySelector('.profile-btn');
    const isExpanded = btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
    btn.setAttribute('aria-expanded', isExpanded);
  }

  function setupLazyRows() {
    const rows = document.querySelectorAll('.movie-row');
    if ('IntersectionObserver' in window) {
      rows.forEach(row => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        observer.observe(row);
      });
    } else {
      rows.forEach(row => row.classList.add('visible'));
    }
  }

  function simulateContinueWatching() {
    let continueData = JSON.parse(localStorage.getItem('netflixContinue')) || [];
    if (continueData.length === 0) {
      const randomMovies = [...MOVIES].sort(() => 0.5 - Math.random()).slice(0, 4);
      continueData = randomMovies.map(m => ({ id: m.id, progress: Math.floor(Math.random() * 80) + 10 }));
      localStorage.setItem('netflixContinue', JSON.stringify(continueData));
    }
    renderContinueWatching();
  }

  function setupLanguageSelector() {
    const selector = document.getElementById('language-select');
    if (selector) {
      selector.addEventListener('change', (e) => {
        localStorage.setItem('netflixLang', e.target.value);
      });
      const saved = localStorage.getItem('netflixLang');
      if (saved) selector.value = saved;
    }
  }

  function setupModalActions() {
    if (!modal) return;
    modal.querySelector('.modal-add-btn').addEventListener('click', () => {
      const id = MOVIES.find(m => m.title === modalTitle.textContent)?.id;
      if (id) {
        const movie = MOVIES.find(m => m.id === id);
        toggleMyList(movie, modal.querySelector('.modal-add-btn'));
      }
    });
    modal.querySelector('.modal-like-btn').addEventListener('click', () => {
      const id = MOVIES.find(m => m.title === modalTitle.textContent)?.id;
      if (id) {
        const movie = MOVIES.find(m => m.id === id);
        toggleLike(movie, modal.querySelector('.modal-like-btn'));
      }
    });
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-play-btn').addEventListener('click', () => {
      const id = MOVIES.find(m => m.title === modalTitle.textContent)?.id;
      if (id) {
        let continueData = JSON.parse(localStorage.getItem('netflixContinue')) || [];
        const existing = continueData.find(c => c.id === id);
        if (!existing) {
          continueData.push({ id, progress: 15 });
          localStorage.setItem('netflixContinue', JSON.stringify(continueData));
          renderContinueWatching();
        }
      }
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-overlay')) {
        closeModal();
      }
    });
  }

  function signOut() {
    localStorage.removeItem('netflixProfile');
    localStorage.removeItem('netflixMyList');
    localStorage.removeItem('netflixLiked');
    localStorage.removeItem('netflixContinue');
    window.location.replace('signin.html');
  }

  function setupSignOut() {
    document.querySelectorAll('.signout-link').forEach(link => {
      link.addEventListener('click', (e) => { e.preventDefault(); signOut(); });
    });
  }

  let trendingMovies = [];

  async function loadTrendingToday() {
    if (PAGE !== 'home') return;
    try {
      trendingMovies = await fetchTMDbTrending();
    } catch (e) {
      trendingMovies = TRENDING_TODAY;
    }
    const rows = document.querySelectorAll('[data-category="trending"] .row-scroll');
    const popularRows = document.querySelectorAll('[data-category="popular"] .row-scroll');
    const newRows = document.querySelectorAll('[data-category="new"] .row-scroll');
    const allScrolls = [...rows, ...popularRows, ...newRows];
    if (allScrolls.length === 0) return;
    allScrolls.forEach(scroll => {
      trendingMovies.forEach((movie, idx) => {
        const card = createMovieCard(movie, {});
        card.querySelector('.movie-card-rating')?.remove();
        const meta = card.querySelector('.movie-card-meta');
        if (meta) {
          const badge = document.createElement('span');
          badge.className = 'movie-card-rating';
          badge.style.color = '#ffd700';
          badge.textContent = '# ' + (idx + 1);
          meta.prepend(badge);
        }
        scroll.prepend(card);
      });
    });
  }

  function setActiveNavLink() {
    const pageMap = { home:'index', tvshows:'tv-shows', movies:'movies', newpopular:'new-popular', mylist:'my-list' };
    const currentPage = pageMap[PAGE] || 'index';
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.includes(currentPage + '.html')) {
        link.classList.add('active');
      }
      if (currentPage === 'index' && (href === 'index.html' || href === '/' || href === '')) {
        link.classList.add('active');
      }
    });
  }

  function hideLoadingScreen() {
    setTimeout(() => {
      loadingScreen.classList.add('loaded');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 600);
    }, 1200);
  }

  function init() {
    const categories = PAGE === 'tvshows' ? TV_CATEGORIES :
                       PAGE === 'movies' ? MOVIE_CATEGORIES :
                       PAGE === 'newpopular' ? NEWPOPULAR_CATEGORIES :
                       CATEGORIES;

    renderRows(categories);
    renderMyList();
    simulateContinueWatching();
    setupRowScrolling();
    setupModalActions();
    setupLanguageSelector();
    setActiveNavLink();
    setupSignOut();
    loadTrendingToday();

    const hero = document.querySelector('.hero');
    if (hero) {
      hero.classList.add('fade-in');
      hero.style.animationDelay = '0.5s';
    }

    hideLoadingScreen();

    document.addEventListener('scroll', () => {
      handleNavScroll();
      updateScrollProgress();
      handleScrollToTopVisibility();
      handleScrollReveal();
    }, { passive: true });

    if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    if (searchToggle) searchToggle.addEventListener('click', toggleSearch);
    if (searchInput) {
      searchInput.addEventListener('input', (e) => performSearch(e.target.value));
      searchInput.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleSearch(); });
    }

    const profileBtn = document.querySelector('.profile-btn');
    if (profileBtn) profileBtn.addEventListener('click', toggleProfileDropdown);

    document.addEventListener('click', (e) => {
      if (profileDropdown && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove('open');
        const btn = profileDropdown.querySelector('.profile-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });

    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add('visible');
        }
      });
    }, 500);

    setupLazyRows();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
