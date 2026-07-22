/* ==============================
   Shared Movie Database
   ============================== */
const MOVIES = [
  { id: 1,  title: 'Arcane',                year: 2021, rating: 'TV-14', duration: '1 Season',   genre: 'Animation', type: 'tv',  cast: 'Hailee Steinfeld, Ella Purnell', description: 'Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League of Legends champions and the power that will tear them apart.', poster: 'https://picsum.photos/seed/arcane/300/450', category: ['trending','popular','new','toprated'] },
  { id: 2,  title: 'Stranger Things',        year: 2022, rating: 'TV-14', duration: '4 Seasons',  genre: 'Sci-Fi', type: 'tv',  cast: 'Millie Bobby Brown, Finn Wolfhard', description: 'When a young boy disappears, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.', poster: 'https://picsum.photos/seed/stranger/300/450', category: ['trending','popular','scifi','horror','toprated'] },
  { id: 3,  title: 'The Witcher',            year: 2021, rating: 'TV-MA', duration: '3 Seasons',  genre: 'Fantasy', type: 'tv',  cast: 'Henry Cavill, Anya Chalotra', description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.', poster: 'https://picsum.photos/seed/witcher/300/450', category: ['trending','popular','action','new','toprated'] },
  { id: 4,  title: 'Money Heist',            year: 2021, rating: 'TV-MA', duration: '5 Seasons',  genre: 'Crime', type: 'tv',  cast: 'Ursula Corbero, Alvaro Morte', description: 'An unusual group of robbers attempt to carry out the most perfect heist in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.', poster: 'https://picsum.photos/seed/moneyheist/300/450', category: ['trending','popular','action','crime','toprated'] },
  { id: 5,  title: 'Squid Game',             year: 2021, rating: 'TV-MA', duration: '1 Season',   genre: 'Thriller', type: 'tv',  cast: 'Lee Jung-jae, Park Hae-soo', description: 'Hundreds of cash-strapped players accept a strange invitation to compete in childrens games. Inside, a tempting prize awaits with deadly high stakes.', poster: 'https://picsum.photos/seed/squidgame/300/450', category: ['trending','popular','horror','toprated'] },
  { id: 6,  title: 'Wednesday',              year: 2022, rating: 'TV-14', duration: '1 Season',   genre: 'Comedy', type: 'tv',  cast: 'Jenna Ortega, Catherine Zeta-Jones', description: 'While attending Nevermore Academy, Wednesday Addams attempts to master her emerging psychic ability, thwart a killing spree, and solve the mystery that embroiled her parents.', poster: 'https://picsum.photos/seed/wednesday/300/450', category: ['trending','popular','comedy','new'] },
  { id: 7,  title: 'Black Mirror',           year: 2019, rating: 'TV-MA', duration: '5 Seasons',  genre: 'Sci-Fi', type: 'tv',  cast: 'Various', description: 'A sci-fi anthology series that explores techno-paranoia and the dark side of modern society.', poster: 'https://picsum.photos/seed/blackmirror/300/450', category: ['trending','scifi','toprated'] },
  { id: 8,  title: 'The Crown',              year: 2022, rating: 'TV-MA', duration: '5 Seasons',  genre: 'Drama', type: 'tv',  cast: 'Imelda Staunton, Jonathan Pryce', description: 'Follows the political rivalries and romance of Queen Elizabeth IIs reign and the events that shaped the second half of the twentieth century.', poster: 'https://picsum.photos/seed/crown/300/450', category: ['trending','popular','new','toprated'] },
  { id: 9,  title: 'Narcos',                 year: 2017, rating: 'TV-MA', duration: '3 Seasons',  genre: 'Crime', type: 'tv',  cast: 'Wagner Moura, Pedro Pascal', description: 'A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kinglets who plagued the country.', poster: 'https://picsum.photos/seed/narcos/300/450', category: ['popular','action','crime'] },
  { id: 10, title: 'Dark',                   year: 2020, rating: 'TV-MA', duration: '3 Seasons',  genre: 'Sci-Fi', type: 'tv',  cast: 'Louis Hofmann, Karoline Eichhorn', description: 'A missing child sets four families on a frantic hunt for answers as they unearth a mind-bending mystery that spans three generations.', poster: 'https://picsum.photos/seed/dark/300/450', category: ['scifi','toprated'] },
  { id: 11, title: 'The Office',             year: 2013, rating: 'TV-14', duration: '9 Seasons',  genre: 'Comedy', type: 'tv',  cast: 'Steve Carell, Rainn Wilson', description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.', poster: 'https://picsum.photos/seed/office/300/450', category: ['comedy','popular'] },
  { id: 12, title: 'Breaking Bad',           year: 2013, rating: 'TV-MA', duration: '5 Seasons',  genre: 'Crime', type: 'tv',  cast: 'Bryan Cranston, Aaron Paul', description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family future.', poster: 'https://picsum.photos/seed/breakingbad/300/450', category: ['action','crime','toprated'] },
  { id: 13, title: 'Bridgerton',             year: 2022, rating: 'TV-MA', duration: '2 Seasons',  genre: 'Romance', type: 'tv',  cast: 'Phoebe Dynevor, Reg-Jean Page', description: 'The eight close-knit siblings of the Bridgerton family look for love and happiness in London high society.', poster: 'https://picsum.photos/seed/bridgerton/300/450', category: ['romance','new','popular'] },
  { id: 14, title: 'Emily in Paris',         year: 2022, rating: 'TV-MA', duration: '3 Seasons',  genre: 'Romance', type: 'tv',  cast: 'Lily Collins, Philippine Leroy-Beaulieu', description: 'A young American woman moves to Paris for a job opportunity and navigates the challenges of a new culture, career, and romance.', poster: 'https://picsum.photos/seed/emilyparis/300/450', category: ['romance','comedy','new'] },
  { id: 15, title: 'The Sandman',            year: 2022, rating: 'TV-MA', duration: '1 Season',   genre: 'Fantasy', type: 'tv',  cast: 'Tom Sturridge, Boyd Holbrook', description: 'After years of imprisonment, Morpheus embarks on a journey across worlds to find what was stolen from him and restore his power.', poster: 'https://picsum.photos/seed/sandman/300/450', category: ['scifi','new','toprated'] },
  { id: 16, title: 'Dahmer',                 year: 2022, rating: 'TV-MA', duration: '1 Season',   genre: 'Crime', type: 'tv',  cast: 'Evan Peters, Niecy Nash', description: 'The story of one of America most notorious serial killers, told from the perspective of his victims and the systemic failures that allowed him to continue.', poster: 'https://picsum.photos/seed/dahmer/300/450', category: ['horror','crime','new','toprated'] },
  { id: 17, title: 'The Boys',               year: 2022, rating: 'TV-MA', duration: '3 Seasons',  genre: 'Action', type: 'tv',  cast: 'Karl Urban, Jack Quaid', description: 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.', poster: 'https://picsum.photos/seed/theboys/300/450', category: ['action','popular','scifi'] },
  { id: 18, title: 'Cobra Kai',              year: 2022, rating: 'TV-14', duration: '4 Seasons',  genre: 'Action', type: 'tv',  cast: 'Ralph Macchio, William Zabka', description: 'Decades after the tournament that changed their lives, the rivalry between Johnny and Daniel reignites in this sequel to the Karate Kid films.', poster: 'https://picsum.photos/seed/cobrakai/300/450', category: ['action','comedy','new'] },
  { id: 19, title: 'YOU',                    year: 2021, rating: 'TV-MA', duration: '3 Seasons',  genre: 'Thriller', type: 'tv',  cast: 'Penn Badgley, Victoria Pedretti', description: 'A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is fascinated by.', poster: 'https://picsum.photos/seed/you/300/450', category: ['popular','horror','crime'] },
  { id: 20, title: 'Peaky Blinders',         year: 2022, rating: 'TV-MA', duration: '6 Seasons',  genre: 'Crime', type: 'tv',  cast: 'Cillian Murphy, Paul Anderson', description: 'A gangster family in 1919 Birmingham, England, and their boss Tommy Shelby, who controls the city with his Peaky Blinders gang.', poster: 'https://picsum.photos/seed/peaky/300/450', category: ['action','crime','toprated'] },
  { id: 21, title: 'Love Is Blind',          year: 2023, rating: 'TV-14', duration: '3 Seasons',  genre: 'Reality', type: 'tv',  cast: 'Various', description: 'Singles form deep connections before ever seeing each other in this dating experiment that asks: is love truly blind?', poster: 'https://picsum.photos/seed/loveblind/300/450', category: ['romance','new'] },
  { id: 22, title: 'Alice in Borderland',    year: 2022, rating: 'TV-MA', duration: '2 Seasons',  genre: 'Sci-Fi', type: 'tv',  cast: 'Kento Yamazaki, Tao Tsuchiya', description: 'A group of bored delinquents are transported to a parallel dimension where they must compete in deadly games to survive.', poster: 'https://picsum.photos/seed/aliceborder/300/450', category: ['scifi','action','new'] },
  { id: 23, title: 'The Queen Gambit',       year: 2020, rating: 'TV-MA', duration: '1 Season',   genre: 'Drama', type: 'tv',  cast: 'Anya Taylor-Joy, Bill Camp', description: 'In 1950s Kentucky, a young girl discovers a remarkable talent for chess while struggling with addiction in a journey to become the worlds greatest player.', poster: 'https://picsum.photos/seed/queensgambit/300/450', category: ['toprated','new'] },
  { id: 24, title: 'Lupin',                  year: 2021, rating: 'TV-14', duration: '2 Seasons',  genre: 'Crime', type: 'tv',  cast: 'Omar Sy, Ludivine Sagnier', description: 'Inspired by the adventures of Arsene Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.', poster: 'https://picsum.photos/seed/lupin/300/450', category: ['action','popular','crime','new'] },
  { id: 25, title: 'Ozark',                  year: 2022, rating: 'TV-MA', duration: '4 Seasons',  genre: 'Crime', type: 'tv',  cast: 'Jason Bateman, Laura Linney', description: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss.', poster: 'https://picsum.photos/seed/ozark/300/450', category: ['crime','toprated','horror'] },
  { id: 26, title: 'Inception',              year: 2010, rating: 'PG-13', duration: '2h 28m',    genre: 'Action', type: 'movie', cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt', description: 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a C.E.O.', poster: 'https://picsum.photos/seed/inception/300/450', category: ['action','scifi','toprated'] },
  { id: 27, title: 'The Dark Knight',         year: 2008, rating: 'PG-13', duration: '2h 32m',    genre: 'Action', type: 'movie', cast: 'Christian Bale, Heath Ledger', description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.', poster: 'https://picsum.photos/seed/darkknight/300/450', category: ['action','toprated'] },
  { id: 28, title: 'Interstellar',            year: 2014, rating: 'PG-13', duration: '2h 49m',    genre: 'Sci-Fi', type: 'movie', cast: 'Matthew McConaughey, Anne Hathaway', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.', poster: 'https://picsum.photos/seed/interstellar/300/450', category: ['scifi','toprated'] },
  { id: 29, title: 'Joker',                  year: 2019, rating: 'R', duration: '2h 2m',      genre: 'Crime', type: 'movie', cast: 'Joaquin Phoenix, Robert De Niro', description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.', poster: 'https://picsum.photos/seed/joker/300/450', category: ['crime','toprated'] },
  { id: 30, title: 'Parasite',               year: 2019, rating: 'R', duration: '2h 12m',     genre: 'Thriller', type: 'movie', cast: 'Kang-ho Song, Sun-kyun Lee', description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', poster: 'https://picsum.photos/seed/parasite/300/450', category: ['horror','crime','toprated'] },
  { id: 31, title: 'Spider-Verse',            year: 2023, rating: 'PG', duration: '2h 20m',    genre: 'Animation', type: 'movie', cast: 'Shameik Moore, Hailee Steinfeld', description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.', poster: 'https://picsum.photos/seed/spiderverse/300/450', category: ['action','new','toprated'] },
  { id: 32, title: 'Dune',                    year: 2021, rating: 'PG-13', duration: '2h 35m',    genre: 'Sci-Fi', type: 'movie', cast: 'Timothee Chalamet, Rebecca Ferguson', description: 'Feature adaptation of Frank Herbert science fiction novel about the son of a noble family entrusted with the protection of a valuable asset.', poster: 'https://picsum.photos/seed/dune/300/450', category: ['scifi','action','new'] },
  { id: 33, title: 'Everything Everywhere',   year: 2022, rating: 'R', duration: '2h 19m',     genre: 'Action', type: 'movie', cast: 'Michelle Yeoh, Ke Huy Quan', description: 'An aging Chinese immigrant is swept up in an insane adventure where she alone can save the world by exploring other universes.', poster: 'https://picsum.photos/seed/eeaao/300/450', category: ['action','scifi','comedy','new','toprated'] },
];

const CATEGORIES = [
  { id: 'trending',   title: 'Trending Now' },
  { id: 'popular',    title: 'Popular on Netflix' },
  { id: 'action',     title: 'Action Movies' },
  { id: 'comedy',     title: 'Comedy Movies' },
  { id: 'horror',     title: 'Horror Movies' },
  { id: 'scifi',      title: 'Sci-Fi' },
  { id: 'romance',    title: 'Romance' },
  { id: 'crime',      title: 'Crime & Thrillers' },
  { id: 'new',        title: 'New Releases' },
  { id: 'toprated',   title: 'Top Rated' },
];

const TV_CATEGORIES = [
  { id: 'trending',   title: 'Trending TV Shows' },
  { id: 'popular',    title: 'Popular TV Series' },
  { id: 'comedy',     title: 'TV Comedies' },
  { id: 'horror',     title: 'TV Horror' },
  { id: 'scifi',      title: 'TV Sci-Fi' },
  { id: 'romance',    title: 'TV Romance' },
  { id: 'crime',      title: 'TV Crime & Thrillers' },
  { id: 'new',        title: 'New TV Series' },
  { id: 'toprated',   title: 'Top Rated TV' },
];

const MOVIE_CATEGORIES = [
  { id: 'action',     title: 'Action Movies' },
  { id: 'comedy',     title: 'Comedy Movies' },
  { id: 'horror',     title: 'Horror Movies' },
  { id: 'scifi',      title: 'Sci-Fi Movies' },
  { id: 'crime',      title: 'Crime & Thrillers' },
  { id: 'new',        title: 'New Movie Releases' },
  { id: 'toprated',   title: 'Top Rated Movies' },
];

const NEWPOPULAR_CATEGORIES = [
  { id: 'trending',   title: 'Trending Now' },
  { id: 'popular',    title: 'Popular on Netflix' },
  { id: 'new',        title: 'New Releases' },
];

function getMoviesByCategory(categoryId) {
  return MOVIES.filter(m => m.category.includes(categoryId));
}

function getMoviesByType(type) {
  return MOVIES.filter(m => m.type === type);
}

function getRatingStars(movieId) {
  const movie = MOVIES.find(m => m.id === movieId);
  if (!movie) return '';
  const ratingMap = {
    1:4.5,2:4.8,3:4.6,4:4.4,5:4.7,6:4.3,7:4.5,8:4.2,9:4.6,10:4.5,11:4.1,12:4.9,13:4.0,14:3.9,15:4.4,16:4.2,17:4.7,18:4.1,19:4.3,20:4.8,21:3.8,22:4.5,23:4.9,24:4.3,25:4.6,26:4.8,27:4.9,28:4.7,29:4.4,30:4.6,31:4.5,32:4.3,33:4.8
  };
  return (ratingMap[movieId] || (3.5 + Math.random() * 1.5)).toFixed(1);
}

/* ==============================
   TMDB API Configuration
   ==============================
   To use real movie posters and trending data:
   1. Get a free API key from https://www.themoviedb.org/settings/api
   2. Replace YOUR_TMDB_API_KEY below with your key
   3. Set TMDB_ENABLED = true
   ============================== */
const TMDB_ENABLED = false;
const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const TRENDING_TODAY = [
  { id: 1001, title: 'Today Top Pick', year: 2026, rating: 'TV-MA', duration: '2h 15m', genre: 'Action', cast: 'Featured Cast', description: 'The most watched title on Netflix today. Everyone is talking about this one.', poster: 'https://picsum.photos/seed/trending1/300/450', category: ['trending','popular','new'] },
  { id: 1002, title: 'Viral Sensation', year: 2026, rating: 'TV-14', duration: '1 Season', genre: 'Drama', cast: 'Rising Stars', description: 'Breaking records worldwide. This is the show that has everyone binge-watching.', poster: 'https://picsum.photos/seed/trending2/300/450', category: ['trending','popular','new'] },
  { id: 1003, title: 'Number 1 Hit', year: 2026, rating: 'TV-MA', duration: '2h 30m', genre: 'Thriller', cast: 'A-List Cast', description: 'Topping the charts in over 90 countries. The global phenomenon continues.', poster: 'https://picsum.photos/seed/trending3/300/450', category: ['trending','popular','new'] },
  { id: 1004, title: 'Must Watch Now', year: 2026, rating: 'TV-14', duration: '3 Seasons', genre: 'Sci-Fi', cast: 'Ensemble Cast', description: 'The number one trending title right now. Dont miss what everyone is watching.', poster: 'https://picsum.photos/seed/trending4/300/450', category: ['trending','popular','new'] },
  { id: 1005, title: 'Weekend Binge', year: 2026, rating: 'TV-MA', duration: '1 Season', genre: 'Comedy', cast: 'Comedy Legends', description: 'The perfect weekend watch. Millions of viewers cant stop watching.', poster: 'https://picsum.photos/seed/trending5/300/450', category: ['trending','popular','new'] },
];

async function fetchTMDbTrending() {
  if (!TMDB_ENABLED || TMDB_API_KEY === 'YOUR_TMDB_API_KEY') {
    return TRENDING_TODAY;
  }
  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}&language=en-US`);
    if (!res.ok) throw new Error('TMDB API error');
    const data = await res.json();
    return data.results.slice(0, 10).map((item, idx) => ({
      id: 2000 + idx,
      title: item.title || item.name,
      year: (item.release_date || item.first_air_date || '').split('-')[0] || '2026',
      rating: item.adult ? 'TV-MA' : 'TV-14',
      duration: item.media_type === 'movie' ? '2h' : '1 Season',
      genre: 'Trending',
      cast: 'Various',
      description: item.overview || 'No description available.',
      poster: item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : `https://picsum.photos/seed/trending${idx}/300/450`,
      backdrop: item.backdrop_path ? `${TMDB_IMAGE_BASE}${item.backdrop_path}` : '',
      category: ['trending','popular','new']
    }));
  } catch (e) {
    console.warn('TMDB fetch failed, using fallback:', e);
    return TRENDING_TODAY;
  }
}

const TRENDING_CATEGORIES = [
  { id: 'trending', title: "Today's Top 10" },
  { id: 'popular', title: 'Trending Now' },
  { id: 'new', title: 'New Releases Today' },
];
