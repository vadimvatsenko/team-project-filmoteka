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

// ==============================================================

import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

// ================================================================

//* рейтинг популярний фільмів при загрузці і перезавантаженні сайта
getAPI(API_URL);

//* запит і рендер фільмів за назвою
function handleSubmit(event) {
  event.preventDefault();

  const movie = event.currentTarget.elements.search.value.trim().toLowerCase();

  // =====================================================================
  const options = {
    totalItems: 2500,
    itemsPerPage: 40,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination('pagination', options);
  pagination.on('afterMove', function (eventData) {
    resetGallery();

    getMovieNameAPI(movie, eventData.page);
  });

  function resetGallery() {
    refs.list.innerHTML = '';
  }
  // =============================================================

  //console.log(movie);
  // refs.list.innerHTML = "";

  if (!movie) {
    Notify.failure(
      'Sorry, there are no movies matching your search query. Please try again.'
    );
    return;
  }
  refs.list.innerHTML = '';
  getMovieNameAPI(movie);
}

refs.form.addEventListener('submit', handleSubmit);
