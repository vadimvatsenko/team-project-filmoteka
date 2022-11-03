import { BASE_URL, KEY, API_URL } from './url';
import axios from 'axios';
import { refs } from './refs';

import { generateContent } from './createListItem';
import { Loading, Notify } from 'notiflix';
import Pagination from 'tui-pagination';
import { poginationFilter, paginationPop } from './pagination';

export const filterItem = {
  filterForm: document.querySelector('#filter-form'),
  genreForm: document.querySelector('#genreForm'),
  yearForm: document.querySelector('#yearForm'),
  sortForm: document.querySelector('#sortForm'),

  resetButton: document.querySelector('#button__reset'),
};

//Переменные для запроса на бэкенд
let formSearch = {
  year: '',
  genre: '',
  query: '',
  discover: `discover`,
  page: '',
  sort: '',
};

//запрос на бэкенд по жанру и/или году
export async function getSearchForm(
  genre = '',
  year = '',
  page = '',
  sort = ''
) {
  formSearch.year =
    filterItem.yearForm.value !== 'start' || year !== ''
      ? `&primary_release_year=${filterItem.yearForm.value}`
      : '';
  formSearch.genre =
    genre !== '' && filterItem.genreForm.value !== 'start'
      ? `&with_genres=${filterItem.genreForm.value}`
      : '';
  formSearch.sort =
    sort !== '' && filterItem.sortForm.value !== 'start'
      ? `&sort_by=${filterItem.sortForm.value}`
      : `&sort_by=vote_count.desc`;

  // formSearch.page = page !== 0 || page !== '' ? `&page=${page}` : '';

  if (genre === '') {
    formSearch.discover = 'search';
  }
  if (genre !== '') {
    formSearch.discover = 'discover';
  }
  if (year !== '') {
    formSearch.discover = 'discover';
  }
  if (year !== '') {
    formSearch.discover = 'discover';
  }
  if (sort !== '') {
    formSearch.discover = 'discover';
  }

  const fetchCard = await axios.get(
    `${BASE_URL}${formSearch.discover}/movie?${formSearch.sort}${formSearch.genre}${formSearch.year}&include_adult=false&api_key=${KEY}&page=${page}`
  );
  localStorage.setItem('totalItems', fetchCard.data.total_results);
  localStorage.setItem('itemsPerPage', fetchCard.data.results.length);
  return fetchCard.data;
}

filterItem.genreForm.addEventListener('input', eventGenre);
filterItem.yearForm.addEventListener('input', eventYear);
filterItem.sortForm.addEventListener('input', onSortMovie);

filterItem.resetButton.addEventListener('click', onResetSearch);

//Поиск рендер фильма по жанру
async function eventGenre(evt) {
  evt.preventDefault();

  if (evt) {
    formSearch.genre = evt.target.value;
    formSearch.page = 1;

    await getSearchForm(
      formSearch.genre,
      formSearch.year,
      formSearch.page,
      formSearch.sort
    )
      .then(data => {
        Loading.custom('Loading...', {
          customSvgCode:
            '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><linearGradient id="myG"  fy="0" gradientTransform="rotate(60 .5 .5)"><stop offset="0" stop-color="#f15361"></stop><stop offset=".25" stop-color="#ffffff"><animate attributeName="offset" dur="2s" values="0;1;0"repeatCount="indefinite" /></stop><stop offset="1" stop-color="#f15361"/></linearGradient><path d="M0 0V12H16V0H0ZM3 11H1V9H3V11ZM3 7H1V5H3V7ZM3 3H1V1H3V3ZM12 11H4V1H12V11ZM15 11H13V9H15V11ZM15 7H13V5H15V7ZM15 3H13V1H15V3ZM6 3V9L10 6L6 3Z" fill="url(#myG)"/></svg>',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        });

        if (data.results.length !== 0) {
          renderFiltrMarkup(data.results);
        } else {
          Loading.custom('Loading...', {
            customSvgCode:
              '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><linearGradient id="myG"  fy="0" gradientTransform="rotate(60 .5 .5)"><stop offset="0" stop-color="#f15361"></stop><stop offset=".25" stop-color="#ffffff"><animate attributeName="offset" dur="2s" values="0;1;0"repeatCount="indefinite" /></stop><stop offset="1" stop-color="#f15361"/></linearGradient><path d="M0 0V12H16V0H0ZM3 11H1V9H3V11ZM3 7H1V5H3V7ZM3 3H1V1H3V3ZM12 11H4V1H12V11ZM15 11H13V9H15V11ZM15 7H13V5H15V7ZM15 3H13V1H15V3ZM6 3V9L10 6L6 3Z" fill="url(#myG)"/></svg>',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          });
          Notify.failure(`Nothing was found for your request`);
          refs.list.innerHTML = ` <img src="${'https://cdn.dribbble.com/users/4266416/screenshots/8269080/media/69de53b0834d3b0c493f21d4ce773dfd.png'}"
          alt="no movies found" class="no__found">`;
        }
      })
      .catch(error => console.log(error))
      .finally(() => Loading.remove(2000));
    poginationFilter(formSearch.genre, formSearch.year, formSearch.sort);
    Notify.success(
      `We found ${JSON.parse(localStorage.getItem('totalItems'))} movies.`
    );
  }
}

//Поиск и рендер фильма по году
async function eventYear(evt) {
  evt.preventDefault();
  // localStorage.setItem("genre", formSearch.genre? formSearch.genre:" ");
  //     localStorage.setItem("year", formSearch.year? formSearch.year: " ");
  if (evt) {
    formSearch.year = Number(evt.target.value);
    formSearch.page = 1;

    await getSearchForm(
      formSearch.genre,
      formSearch.year,
      formSearch.page,
      formSearch.sort
    )
      .then(data => {
        Loading.custom('Loading...', {
          customSvgCode:
            '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><linearGradient id="myG"  fy="0" gradientTransform="rotate(60 .5 .5)"><stop offset="0" stop-color="#f15361"></stop><stop offset=".25" stop-color="#ffffff"><animate attributeName="offset" dur="2s" values="0;1;0"repeatCount="indefinite" /></stop><stop offset="1" stop-color="#f15361"/></linearGradient><path d="M0 0V12H16V0H0ZM3 11H1V9H3V11ZM3 7H1V5H3V7ZM3 3H1V1H3V3ZM12 11H4V1H12V11ZM15 11H13V9H15V11ZM15 7H13V5H15V7ZM15 3H13V1H15V3ZM6 3V9L10 6L6 3Z" fill="url(#myG)"/></svg>',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        });

        if (data.results.length !== 0) {
          renderFiltrMarkup(data.results);
        } else {
          Loading.custom('Loading...', {
            customSvgCode:
              '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><linearGradient id="myG"  fy="0" gradientTransform="rotate(60 .5 .5)"><stop offset="0" stop-color="#f15361"></stop><stop offset=".25" stop-color="#ffffff"><animate attributeName="offset" dur="2s" values="0;1;0"repeatCount="indefinite" /></stop><stop offset="1" stop-color="#f15361"/></linearGradient><path d="M0 0V12H16V0H0ZM3 11H1V9H3V11ZM3 7H1V5H3V7ZM3 3H1V1H3V3ZM12 11H4V1H12V11ZM15 11H13V9H15V11ZM15 7H13V5H15V7ZM15 3H13V1H15V3ZM6 3V9L10 6L6 3Z" fill="url(#myG)"/></svg>',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          });
          Notify.failure(`Nothing was found for your request`);
          refs.list.innerHTML = ` <img src="${'https://cdn.dribbble.com/users/4266416/screenshots/8269080/media/69de53b0834d3b0c493f21d4ce773dfd.png'}"
          alt="no movies found" class="no__found">`;
        }
      })
      .catch(error => console.log(error))
      .finally(() => Loading.remove(2000));
    console.log(localStorage.getItem('totalItems'));
    poginationFilter(formSearch.genre, formSearch.year, formSearch.sort);
    Notify.success(
      `We found ${JSON.parse(localStorage.getItem('totalItems'))} movies.`
    );
  }
}
//Сортировка отфильтрованных фильмов
async function onSortMovie(evt) {
  evt.preventDefault();

  formSearch.sort = evt.target.value;
  formSearch.page = 1;

  await getSearchForm(
    formSearch.genre,
    formSearch.year,
    formSearch.page,
    formSearch.sort
  )
    .then(data => {
      Loading.custom('Loading...', {
        customSvgCode:
          '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><linearGradient id="myG"  fy="0" gradientTransform="rotate(60 .5 .5)"><stop offset="0" stop-color="#f15361"></stop><stop offset=".25" stop-color="#ffffff"><animate attributeName="offset" dur="2s" values="0;1;0"repeatCount="indefinite" /></stop><stop offset="1" stop-color="#f15361"/></linearGradient><path d="M0 0V12H16V0H0ZM3 11H1V9H3V11ZM3 7H1V5H3V7ZM3 3H1V1H3V3ZM12 11H4V1H12V11ZM15 11H13V9H15V11ZM15 7H13V5H15V7ZM15 3H13V1H15V3ZM6 3V9L10 6L6 3Z" fill="url(#myG)"/></svg>',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      });

      if (data.results.length !== 0) {
        renderFiltrMarkup(data.results);
      } else {
        Loading.custom('Loading...', {
          customSvgCode:
            '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><linearGradient id="myG"  fy="0" gradientTransform="rotate(60 .5 .5)"><stop offset="0" stop-color="#f15361"></stop><stop offset=".25" stop-color="#ffffff"><animate attributeName="offset" dur="2s" values="0;1;0"repeatCount="indefinite" /></stop><stop offset="1" stop-color="#f15361"/></linearGradient><path d="M0 0V12H16V0H0ZM3 11H1V9H3V11ZM3 7H1V5H3V7ZM3 3H1V1H3V3ZM12 11H4V1H12V11ZM15 11H13V9H15V11ZM15 7H13V5H15V7ZM15 3H13V1H15V3ZM6 3V9L10 6L6 3Z" fill="url(#myG)"/></svg>',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        });
        Notify.failure(`Nothing was found for your request`);
        refs.list.innerHTML = ` <img src="${'https://cdn.dribbble.com/users/4266416/screenshots/8269080/media/69de53b0834d3b0c493f21d4ce773dfd.png'}"
          alt="no movies found" class="no__found">`;
      }
    })
    .catch(error => console.log(error))
    .finally(() => Loading.remove(2000));
  poginationFilter(formSearch.genre, formSearch.year, formSearch.sort);
  Notify.success(
    `We found ${JSON.parse(localStorage.getItem('totalItems'))} movies.`
  );
}

//рендер разметки отфильтрованных фильмов
export function renderFiltrMarkup(array) {
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
  formSearch.sort = '';

  paginationPop.movePageTo(localStorage.getItem('pagination'));
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
