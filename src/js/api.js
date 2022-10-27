

//! моє


// import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { refs } from './refs';
import { getAPI, generateContent, pasteContent } from './popularRender';
import {
  getMovieNameAPI,
  generateContentNameAPI,
  pasteContentNameAPI,
} from './renderByName';
import {
  BASE_URL,
  KEY,
  IMG_URL,
  API_URL,
  POPULAR_URL,
  BASE_FIND_WORD_URL,
} from './url';

//* рейтинг популярний фільмів при загрузці і перезавантаженні сайта
getAPI(API_URL);

//* запит і рендер фільмів за назвою
function handleSubmit(event) {
  event.preventDefault();

  const movie = event.currentTarget.elements.search.value.trim().toLowerCase();
  console.log(movie);
  // refs.list.innerHTML = "";

  if (!movie) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  refs.list.innerHTML = '';
  getMovieNameAPI(movie);
}

refs.form.addEventListener('submit', handleSubmit);
