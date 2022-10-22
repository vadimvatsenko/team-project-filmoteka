import { onScroll, onTopButton } from './js/scroll';

onScroll();
onTopButton();
//

const API_KEY = '137ae7e6367e772dd156f1aad841f871';
const BASE_URL = 'https://api.themoviedb.org/3'
const URL = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=1`;
let page = 1;

const getTopMovie = document.querySelector('.movie-popular__list');
const getSearchForm = document.querySelector('.header__form');

getSearchForm.addEventListener('submit', getSearch);

async function getSearch(e) {
    e.preventDefault();
    const searchWord = e.currentTarget.search.value;
    
    const searchMovie = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${searchWord}`)
        .then(response => response.json());
    console.log(searchMovie);
    console.log(searchMovie.results);
    
    const searchMovieMarkup = searchMovie.results.map(({ title, poster_path}) => {
        

        return `<li class='movie-popular__item'>
       
        <img class='movie-popular__img' src="https://image.tmdb.org/t/p/w500${poster_path}"/>
        <div class = 'movie-popular__wrap-info'>
        <h3 class='movie-popular__title'>${title}</h3>
        </div>
        </li>`
        
 }).join('');

    getTopMovie.innerHTML = searchMovieMarkup;
    
    
}
    
  





getTrendingMovie()
async function getTrendingMovie() {
    const topMovieInfo = await fetch(URL).then(response => response.json());

    const topMovieMarkup = topMovieInfo.results.map(({ title, poster_path, release_date, vote_average }) => {
        

        return `<li class='movie-popular__item'>
       
        <img class='movie-popular__img' src="https://image.tmdb.org/t/p/w500${poster_path}"/>
        <div class = 'movie-popular__wrap-info'>
        <h3 class='movie-popular__title'>${title}</h3>
        <p class='movie-popular__release'>${release_date}</p>
        <p class='movie-popular__rating'>${vote_average}</p>
        </div>
        </li>`
        
   
    }).join('');

    getTopMovie.innerHTML = topMovieMarkup;
    
    
}




 













