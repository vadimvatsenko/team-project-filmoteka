export const BASE_URL = 'https://api.themoviedb.org/3/';                             //базове юрл
export const KEY = '00bb2c85647763d13c7f7e27b824373c';                               //ключ
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';                            // посилання на картинку
export const API_URL = `${BASE_URL}trending/all/day?api_key=${KEY}`;                 // посилання на початковий рендер популярних фільмів
export const BASE_FIND_WORD_URL = `https://api.themoviedb.org/3/search/movie?api_key=00bb2c85647763d13c7f7e27b824373c`  // посилання на пошук фільмів за назвою
export const POPULAR_URL = `${BASE_URL}discover/movie/?sort_by=popularity.desc&api_key=${KEY}`;
// export const MODAL_MOVIE_CARD = ``

const API_GENRE = `${BASE_URL}genre/movie/list?api_key=${KEY}`              // посилання на жанри фільмів



// ! Розробнику/розробниці модалки приклад

// const modalUrl = `${BASE_URL}movie/${id}?api_key=${KEY}`

// fetchCardFilm(25)

// function fetchCardFilm(id) {
//   fetch(`${BASE_URL}movie/${id}?api_key=${KEY}`)
//   .then(response => {
//   if (!response.ok) {
//     throw new Error(response.status);
//   }
//   return response.json();
//   })
//   .then(data => {
//     console.log(data);
    // console.log(data.poster_path);
    // console.log(data.title);
    // console.log(data.vote_average);
    // console.log(data.vote_count);
    // console.log(data.popularity);
    // console.log(data.original_title);
    // console.log(data.genres);
    // console.log(data.genres[0].name);
    // console.log(data.genres[0]);
    // console.log(data.overview);

    // pasteCardMovieContent(id);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });
// }