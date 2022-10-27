import { refs  } from './refs';
import { BASE_URL, KEY, IMG_URL, API_URL, POPULAR_URL } from "./url"
import { getfilmsGenres } from './getGandersFromId';


export function createListItem({
      poster_path,
      original_title,
      genre_ids,
      release_date,
      first_air_date,
      original_name,
}) {
  
  let allGanres = getfilmsGenres(genre_ids).join(', ');
 
      return `<li class="movie-popular__item">
        <a href="" class="movie-popular__reference" target="_blank">
        <img src="${poster_path? IMG_URL + poster_path: "https://via.placeholder.com/395x574"}" 
        class="movie-popular__img" 
          alt="${original_title || original_name}">
        <h2 class="movie-popular__title">${(original_title || original_name) ? (original_title || original_name) : ""}</h2>
        <p class="movie-popular__genre">${allGanres.length <= 2 ? allGanres : allGanres + ", " + "Other"} | ${
        (Number.parseInt(release_date) || Number.parseInt(first_air_date)) ? (Number.parseInt(release_date) || Number.parseInt(first_air_date)) : ""
      }</p>
      </a>
        </li>`;
    }

    

    export function generateContent(array) {
      return array.reduce((acc, item) => acc + createListItem(item), '');
    }
    
    export function pasteContent(array) {
      const result = generateContent(array);
      refs.list.insertAdjacentHTML('beforeend', result);
}
    

    