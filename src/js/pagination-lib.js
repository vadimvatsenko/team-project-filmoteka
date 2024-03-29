import Pagination from 'tui-pagination';
import { getWatched } from './lib';
import { refs } from './refs';

const localUserId = localStorage.getItem('id-user');

export function paginationWatchid() {
  const optionsPop = {
    totalItems: localUserId
      ? JSON.parse(localStorage.getItem('WatchedFb'))
      : JSON.parse(localStorage.getItem('watched')).watched.length,
    itemsPerPage: 20,
    visiblePages: window.screen.width <= 400 ? 2 : 5,
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

    getWatched('watched', eventData.page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  removeHiddenPagination();
  if (optionsPop.totalItems <= 20) {
    addHiddenPagination();
  }
}

export function paginationQueue() {
  const optionsPop = {
    totalItems: localUserId
      ? JSON.parse(localStorage.getItem('QueueFb'))
      : JSON.parse(localStorage.getItem('watched')).queue.length,
    itemsPerPage: 20,
    visiblePages: window.screen.width <= 400 ? 2 : 5,
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

    getWatched('queue', eventData.page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  removeHiddenPagination();
  if (optionsPop.totalItems <= 20) {
    addHiddenPagination();
  }
}

// ховає пагінацію
export function addHiddenPagination() {
  const paginationHtml = document.querySelector('#pagination');
  paginationHtml.classList.add('visually-hidden');
}

export function removeHiddenPagination() {
  const paginationHtml = document.querySelector('#pagination');
  paginationHtml.classList.remove('visually-hidden');
}

function resetGallery() {
  refs.list.innerHTML = '';
}
