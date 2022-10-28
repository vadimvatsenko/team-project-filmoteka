import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { refs } from './refs';
import { getAPI, generateContent, pasteContent } from './popularRender';
import { BASE_URL, KEY, IMG_URL, API_URL, POPULAR_URL } from './url';
import {
  getMovieNameAPI,
  generateContentNameAPI,
  pasteContentNameAPI,
} from './renderByName';
console.log(getAPI);

const options = {
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

export const pagination = new Pagination('pagination', options);

pagination.on('afterMove', function (eventData) {
  resetGallery();
  getAPI(`${API_URL}&page=${eventData.page}`);
  localStorage.setItem('pagination', eventData.page);
  //   console.log(refs.list.childNodes.length);
});
// pagination.movePageTo(localStorage.getItem('pagination'));

function resetGallery() {
  refs.list.innerHTML = '';
}
