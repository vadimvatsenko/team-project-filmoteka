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

// export async function fetchCardFilm(id) {
//  await fetch(`${BASE_URL}movie/${id}?api_key=${KEY}`)
//   .then(response => {
//   if (!response.ok) {
//     throw new Error(response.status);
//   }
//   return response.json();
//   })
//   .then(data => {
//       return `
//     <img class="modal-movie__img" src="${data.poster_path ? IMG_URL + data.poster_path : "https://via.placeholder.com/395x574"}" alt="${data.original_title || data.original_name}" width="240" height="357" />
//     <div>
//       <h2 class="modal-movie__title">${(data.original_title || data.original_name) ? (data.original_title || data.original_name) : ""}</h2>
//       <ul class="modal-movie__list">
//         <li class="modal-movie__item">
//           <p class="modal-movie__item-categories">Vote / Votes</p>
//           <p class="modal-movie__item-inf">
//             <span class="modal-movie__item-vote">${data.vote_average}</span> /
//             <span class="modal-movie__item-votes">${data.vote_count}</span>
//           </p>
//         </li>
//         <li class="modal-movie__item">
//           <p class="modal-movie__item-categories">Popularity</p>
//           <p class="modal-movie__item-inf">${data.popularity}</p>
//         </li>
//         <li class="modal-movie__item">
//           <p class="modal-movie__item-categories">Original Title </p>
//           <p class="modal-movie__item-inf modal-movie__item-inf--uppercase">
//             ${data.original_title}
//           </p>
//         </li>
//         <li class="modal-movie__item">
//           <p class="modal-movie__item-categories">Genre</p>
//           <p class="modal-movie__item-inf">${data.genres[0].name}</p>
//         </li>
//       </ul>
//       <h3 class="modal-movie__about">About</h3>
//       <p class="modal-movie__about-text">
//         ${data.overview}
//       </p>
//       <div class="modal-movie__btn-section">
//         <button class="modal-movie__btn modal-movie__btn--margin" type="button">
//           add to Watched
//         </button>
//         <button class="modal-movie__btn" type="button">add to queue</button>
//       </div>
//     </div>
//       `;
//   })
//    .then(response => el.innerHTML = response)
//   .catch(error => {
//     console.log('error', error);
//   });
// }

export async function fetchCardFilm(id) {

  const fetchCard = await fetch(`${BASE_URL}movie/${id}?api_key=${KEY}`)
  const fetchCardJson = await fetchCard.json();
    
  console.log(fetchCardJson);
  return CardFilminHtml(fetchCardJson);
}

function CardFilminHtml(data) {
  return `
    <img class="modal-movie__img" src="${data.poster_path ? IMG_URL + data.poster_path : "https://via.placeholder.com/395x574"}" alt="${data.original_title || data.original_name}" width="240" height="357" />
    <div>
      <h2 class="modal-movie__title">${(data.original_title || data.original_name) ? (data.original_title || data.original_name) : ""}</h2>
      <ul class="modal-movie__list">
        <li class="modal-movie__item">
          <p class="modal-movie__item-categories">Vote / Votes</p>
          <p class="modal-movie__item-inf">
            <span class="modal-movie__item-vote">${data.vote_average}</span> /
            <span class="modal-movie__item-votes">${data.vote_count}</span>
          </p>
        </li>
        <li class="modal-movie__item">
          <p class="modal-movie__item-categories">Popularity</p>
          <p class="modal-movie__item-inf">${data.popularity}</p>
        </li>
        <li class="modal-movie__item">
          <p class="modal-movie__item-categories">Original Title </p>
          <p class="modal-movie__item-inf modal-movie__item-inf--uppercase">
            ${data.original_title}
          </p>
        </li>
        <li class="modal-movie__item">
          <p class="modal-movie__item-categories">Genre</p>
          <p class="modal-movie__item-inf">${data.genres[0].name}</p>
        </li>
      </ul>
      <h3 class="modal-movie__about">About</h3>
      <p class="modal-movie__about-text">
        ${data.overview}
      </p>
      <div class="modal-movie__btn-section">
        <button class="modal-movie__btn modal-movie__btn--margin" type="button">
          add to Watched
        </button>
        <button class="modal-movie__btn" type="button">add to queue</button>
      </div>
    </div>
      `;
}