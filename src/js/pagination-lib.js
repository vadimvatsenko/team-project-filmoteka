
import Pagination from 'tui-pagination';
import { getWatched } from "./lib";
// пагінація
export const btnWatched = document.querySelector('.button-watched');
export const btnQueue = document.querySelector('.button-queue');

btnWatched.addEventListener('click', rWatched);

btnQueue.addEventListener('click', rQueue);

function rWatched() {
    //
  paginationWatchid();
}

function rQueue() {
  //  
  paginationQueue();
}

export function paginationWatchid() {
    const optionsPop = {
 totalItems: JSON.parse(localStorage.getItem('watched')).watched.length,
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

  
    getWatched("watched", eventData.page);

});
}

export function paginationQueue() {
    const optionsPop = {
 totalItems: JSON.parse(localStorage.getItem('watched')).queue.length,
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

  
    getWatched("queue", eventData.page);

});
}

const listWatched = document.querySelector('.movie-list');
function resetGallery() {
  listWatched.innerHTML = '';
}

const localWatched = JSON.parse(localStorage.getItem('watched')).watched;
const localQueue = JSON.parse(localStorage.getItem('watched')).queue;

if (localWatched.length === 0) {
    paginationQueue();
} else {
    paginationWatchid();
}
