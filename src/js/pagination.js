import Pagination from 'tui-pagination';
import { refs } from './refs';
import { getAPI } from './popularRender';
import { getMovieNameAPI } from './renderByName';
import { API_URL } from './url';

// для filter

import { filterItem, getSearchForm, renderFiltrMarkup } from './filter';

export function poginationFilter(genre, year) {
  const options = {
    totalItems: JSON.parse(localStorage.getItem('totalItems')),
    itemsPerPage: 20,
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
  pagination.on('afterMove', async function (eventData) {
    resetGallery();

    getSearchForm(genre, year, eventData.page)
      .then(data => {
        console.log(data);
        renderFiltrMarkup(data.results);
      })
      .catch(error => console.log(error));
  });
}

// для пошуку
export function poginationSearch(movie) {
  // пагінація по пошуку
  const options = {
    totalItems: JSON.parse(localStorage.getItem('totalItems')),
    itemsPerPage: 20,
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
  // pagination.movePageTo(1);
  pagination._options.totalItems = JSON.parse(
    localStorage.getItem('totalItems')
  );
  pagination._options.itemsPerPage = JSON.parse(
    localStorage.getItem('itemsPerPage')
  );
  //   console.log(pagination);
  pagination.on('afterMove', async function (eventData) {
    resetGallery();

    getMovieNameAPI(movie, eventData.page);

    localStorage.setItem('searchPagination', eventData.page);
  });
}

// для полулярних
const optionsPop = {
  totalItems: 20000,
  itemsPerPage: 20,
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

const paginationPop = new Pagination('pagination', optionsPop);

paginationPop.on('afterMove', async function (eventData) {
  resetGallery();

  getAPI(`${API_URL}&page=${eventData.page}`);

  localStorage.setItem('pagination', eventData.page);
});

paginationPop.movePageTo(localStorage.getItem('pagination'));

function resetGallery() {
  refs.list.innerHTML = '';
}
