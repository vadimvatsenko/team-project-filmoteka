import { refs } from './refs';
import { BASE_URL, KEY, IMG_URL, API_URL, POPULAR_URL } from './url';
import { getfilmsGenres } from './getGandersFromId';
import { initializeSlider,resetSlider } from "./slider";

export function createListItem({
  poster_path,
  original_title,
  genre_ids,
  release_date,
  first_air_date,
  original_name,
  id,
  vote_average,
}) {
  let allGanres = getfilmsGenres(genre_ids);

  return `<li class="movie-popular__item" data-id="${id}">
        <a href="" class="movie-popular__reference" target="_blank">
        <img loading="lazy" src="${
          poster_path
            ? IMG_URL + poster_path
            : 'https://i.postimg.cc/6pzyh7Wc/pngwing-com.png'
        }"
        class="movie-popular__img"
          alt="${original_title || original_name}">
        <h2 class="movie-popular__title">${
          original_title || original_name ? original_title || original_name : ''
        }</h2>
        <p class="movie-popular__genre">${
          allGanres.length === 0
            ? 'Genres did not come'
            : allGanres.length <= 2
            ? allGanres.join(', ')
            : allGanres.slice(0, 2).join(', ') + ', ' + 'Other'
        } | ${
    Number.parseInt(release_date) || Number.parseInt(first_air_date)
      ? Number.parseInt(release_date) || Number.parseInt(first_air_date)
      : 'Year not found'
  }</p>
      <p class="movie-popular__rating">${
        vote_average ? vote_average.toFixed(1) : '0'
      }</p>
      </a>
        </li>`;
}

export function generateContent(array) {
  return array.reduce((acc, item) => acc + createListItem(item), '');
}

let sliderActiv = false;
export function pasteContent(array) {
  const result = generateContent(array);
  refs.list.insertAdjacentHTML('beforeend', result);
  
  if (sliderActiv) {
    resetSlider();
  }
  refs.slickSlider.innerHTML = result;
  initializeSlider();
  sliderActiv = true;
}
