import { BASE_URL, KEY, API_URL } from './url';
import axios from 'axios';
import { refs } from './refs';
import { getAPI } from './popularRender';
import { generateContent } from './createListItem';
import { spinerStart, spinerStop } from './spiner';

const filterItem = {
  filterForm: document.querySelector('#filter-form'),
  genreForm: document.querySelector('#genreForm'),
  yearForm: document.querySelector('#yearForm'),

  resetButton: document.querySelector('#button__reset'),
};

//Переменные для запроса на бэкенд
let formSearch = {
  year: '',
  genre: '',
  query: '',
  discover: `trending`,
  page: '',
};

//запрос на бэкенд по жанру и/или году
async function getSearchForm(genre = '', year = '', page = '', query = '') {
  formSearch.year =
    year !== '' && year !== 'start' ? `&primary_release_year=${year}` : '';
  formSearch.genre =
    genre !== '' && genre !== 'start' ? `&with_genres=${genre}` : '';
  formSearch.query = `&query=${query}`;
  formSearch.page = page !== 0 || page !== '' ? `&page=${page}` : '';

  if (query === '') {
    formSearch.queryFetch = '';
  }
  if (query !== '' && genre === '') {
    formSearch.discover = 'search';
  }
  if (query === '' && genre !== '') {
    formSearch.discover = 'discover';
  }
  if (query === '' && year !== '') {
    formSearch.discover = 'discover';
  }

  const fetchCard = await axios.get(
    `${BASE_URL}${formSearch.discover}/movie?sort_by=popularity.desc${formSearch.genre}${formSearch.year}&${formSearch.query}&include_adult=false&api_key=${KEY}&${page}`
  );

  return fetchCard.data;
}

filterItem.genreForm.addEventListener('input', eventGenre);
filterItem.yearForm.addEventListener('input', eventYear);

filterItem.resetButton.addEventListener('click', onResetSearch);

//Поиск рендер фильма по жанру
function eventGenre(evt) {
  evt.preventDefault();
  spinerStart;

  if (evt) {
    formSearch.genre = evt.target.value;
    formSearch.page = 1;

    getSearchForm(formSearch.genre, formSearch.year, formSearch.page)
      .then(data => {
        renderFiltrMarkup(data.results);
      })
      .catch(error => console.log(error))
      .finally(() => spinerStop);
  }
}

//Поиск и рендер фильма по году
function eventYear(evt) {
  evt.preventDefault();

  if (evt) {
    spinerStart;
    formSearch.year = Number(evt.target.value);
    formSearch.page = 1;

    getSearchForm(formSearch.genre, formSearch.year, formSearch.page)
      .then(data => {
        refs.list.innerHTML = '';
        renderFiltrMarkup(data.results);
      })
      .catch(error => console.log(error))
      .finally(() => spinerStop);
  }
}

//рендер разметки отфильтрованных фильмов
function renderFiltrMarkup(array) {
  const result = generateContent(array);
  refs.list.innerHTML = result;
}

//Сброс настроек поиска
function onResetSearch(evt) {
  evt.preventDefault();

  filterItem.genreForm.options.selectedIndex = 0;
  filterItem.yearForm.options.selectedIndex = 0;
  formSearch.genre = '';
  formSearch.year = '';
  formSearch.page = 1;
  refs.list.innerHTML = '';
  getAPI(API_URL);
}

//Coздание и рендер разметки в select YEAR
(function createSelectOptions() {
  let arrayYear = [];
  const date = new Date();

  for (let i = date.getFullYear(); i >= 1950; i -= 1) {
    arrayYear.push(
      `<option class = 'filter__form-years' value="${i}">${i}</option>`
    );
  }
  const elements = arrayYear.join('');
  filterItem.yearForm.insertAdjacentHTML('beforeend', elements);
})();
