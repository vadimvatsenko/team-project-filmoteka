// import axios from 'axios';
import { Loading, Notify } from 'notiflix';

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

// ==============================================================

import { poginationSearch, paginationPop } from './pagination';
import { filterItem } from './filter';
// ================================================================
// сохраняем слово в инпуте
let searchInput = '';

if (JSON.parse(localStorage.getItem('searchWord'))) {
  searchInput = JSON.parse(localStorage.getItem('searchWord'));
  refs.input.value = searchInput;
} else {
  localStorage.setItem('searchWord', JSON.stringify(searchInput));
}
console.dir(refs.input);
refs.input.addEventListener('input', listenInput);

function listenInput(event) {
  localStorage.setItem('searchWord', JSON.stringify(event.currentTarget.value));
  if (event.currentTarget.value === '') {
    refs.list.innerHTML = '';
    filterItem.filterForm.classList.remove('is-hidden');
    paginationPop.movePageTo(localStorage.getItem('pagination'));
  }
}
// сохранение поиска
let searchData = '';

if (JSON.parse(localStorage.getItem('search'))) {
  searchData = JSON.parse(localStorage.getItem('search'));
  refs.input.value = searchData;
} else {
  localStorage.setItem('search', JSON.stringify(searchData));
}

//* рейтинг популярний фільмів при загрузці і перезавантаженні сайта

let statusSearch = false;
let statusSearchForm = false;

//* запит і рендер фільмів за назвою
async function handleSubmit(event) {
  event.preventDefault();

  const movie = event.currentTarget.elements.search.value.trim().toLowerCase();
  localStorage.setItem('search', JSON.stringify(movie));
  localStorage.setItem('searchPagination', 1);
  localStorage.setItem('searchWord', 0);
  searchData = JSON.parse(localStorage.getItem('search'));

  if (!movie) {
    Notify.info(
      'Sorry, there are no movies matching your search query. Please try again.'
    );
    return;
  }
  refs.list.innerHTML = '';
  await getMovieNameAPI(movie);

  // console.log(JSON.parse(localStorage.getItem('itemsPerPage')));
  // console.log(JSON.parse(localStorage.getItem('totalItems')));
  statusSearch = true;

  poginationSearch(movie);
  Notify.success(
    `We found ${JSON.parse(localStorage.getItem('totalItems'))} movies.`
  );
}

refs.form.addEventListener('submit', handleSubmit);
