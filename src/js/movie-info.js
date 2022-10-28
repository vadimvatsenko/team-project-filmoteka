import { Loading } from 'notiflix/build/notiflix-loading-aio';
import * as basicLightbox from 'basiclightbox';

//імпорт Запиту на сервер
import { Api } from './url';
const ApiP = new Api();

//імпорт ModalClassic для відкриття/закриття модального вікна
import ModalClassic from './modalClassic';
const Modal = new ModalClassic(
  '.modal-movie__backdrop',
  '.modal-movie__btn-close'
);

const modalMovi = document.querySelector('.modal-movie__container');
const movieDiv = document.querySelector('.movie-list');

// робота з локальним сховищем
let localStorageMovi = {
  watched: [],
  queue: [],
};

if (localStorage.getItem('watched')) {
  localStorageMovi = JSON.parse(localStorage.getItem('watched'));
} else {
  localStorage.setItem('watched', JSON.stringify(localStorageMovi));
}

// обробка натискання на фільм
movieDiv.addEventListener('click', onMoviClick);

async function onMoviClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'LI') {
    return;
  }
  Loading.custom('Loading...', {
    customSvgCode:
      '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><linearGradient id="myG"  fy="0" gradientTransform="rotate(60 .5 .5)"><stop offset="0" stop-color="#f15361"></stop><stop offset=".25" stop-color="#ffffff"><animate attributeName="offset" dur="2s" values="0;1;0"repeatCount="indefinite" /></stop><stop offset="1" stop-color="#f15361"/></linearGradient><path d="M0 0V12H16V0H0ZM3 11H1V9H3V11ZM3 7H1V5H3V7ZM3 3H1V1H3V3ZM12 11H4V1H12V11ZM15 11H13V9H15V11ZM15 7H13V5H15V7ZM15 3H13V1H15V3ZM6 3V9L10 6L6 3Z" fill="url(#myG)"/></svg>',
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
  });
  // console.log(e.target);
  // modalMovi.innerHTML = spinerInMovi();
  modalMovi.innerHTML = ' ';

  Modal.openModal();

  const idMovie = e.target.dataset.id;

  try {
    const Seach = await ApiP.fetchCardFilm(idMovie);
    modalMovi.innerHTML = CardFilminHtml(Seach);
    onBtnInModalMovi(e);
    Loading.remove(0);
  } catch (error) {
    Loading.remove(0);
    console.log(error);
    modalMovi.innerHTML = CardFilminHtmlIfError(error);
  }

  try {
    const Movies = await ApiP.fetchMovies(idMovie);
    if (Movies.results[0]) {
      modalMovi.insertAdjacentHTML('beforeend', movieBtnHtml());
      const moviesBtn = document.querySelector('.modal-movie__movie');
      moviesBtn.addEventListener('click', openModalMovi(e, Movies.results[0]));
    }
  } catch (error) {
    console.log(error);
    console.log('no movie');
  }
}

function openModalMovi(e, Movie) {
  return async function () {
    console.log(e);
    console.log(Movie);
    //  modalMovi.innerHTML = returnMovie(Movie);
    const options = {
      className: 'basicLightbox__placeholder--transparent',
      onShow: () => {
        window.addEventListener('keydown', onLightboxKeydown);
      },
      onClose: () => {
        window.removeEventListener('keydown', onLightboxKeydown);
        const modalMoviListener = document.querySelector(
          '.basicLightbox__placeholder'
        );
        modalMoviListener.classList.remove(
          'basicLightbox__placeholder--transparent'
        );
      },
    };
    const instance = basicLightbox.create(returnMovie(Movie), options);
    instance.show();

    function onLightboxKeydown(e) {
      if (e.code === 'Escape') {
        instance.close();
      }
    }
  };
}

// Опрацьовує роботу кнопок
function onBtnInModalMovi(e) {
  const idMovie = e.target.outerHTML;
  const modalMoviInfoBtnWatched = document.querySelector(
    '.modal-movie__btn-watched'
  );
  const modalMoviInfoBtnQueue = document.querySelector(
    '.modal-movie__btn-queue'
  );

  modalMoviInfoBtnWatched.addEventListener(
    'click',
    changeWatched(e, modalMoviInfoBtnWatched)
  );

  modalMoviInfoBtnQueue.addEventListener(
    'click',
    changeQueue(e, modalMoviInfoBtnQueue)
  );

  const localStorageWatched = JSON.parse(
    localStorage.getItem('watched')
  ).watched;
  const localStorageQueue = JSON.parse(localStorage.getItem('watched')).queue;

  addCurentInBtn(localStorageWatched, idMovie, modalMoviInfoBtnWatched);
  addCurentInBtn(localStorageQueue, idMovie, modalMoviInfoBtnQueue);

  textCurentBtnWatched(modalMoviInfoBtnWatched);
  textCurentBtnQueue(modalMoviInfoBtnQueue);
}

// Додає та видаляє з локального сховища HTML картки
function changeWatched(e, targetEl) {
  return function () {
    // console.log(targetEl.dataset.ls);

    if (targetEl.dataset.ls === 'false') {
      localStorageMovi.watched.push(e.target.outerHTML);
      localStorage.setItem('watched', JSON.stringify(localStorageMovi));
      // console.log(JSON.stringify(localStorageMovi));
      addCurentBtn(targetEl);
    } else {
      const ingexEl = localStorageMovi.watched.indexOf(e.target.outerHTML);

      localStorageMovi.watched.splice(ingexEl, 1);
      localStorage.setItem('watched', JSON.stringify(localStorageMovi));

      removeCurentBtn(targetEl);
    }
    textCurentBtnWatched(targetEl);
  };
}

function changeQueue(e, targetEl) {
  return function () {
    // console.log(targetEl.dataset.ls);

    if (targetEl.dataset.ls === 'false') {
      localStorageMovi.queue.push(e.target.outerHTML);
      localStorage.setItem('watched', JSON.stringify(localStorageMovi));
      // console.log(JSON.stringify(localStorageMovi));
      addCurentBtn(targetEl);
    } else {
      const ingexEl = localStorageMovi.queue.indexOf(e.target.outerHTML);

      localStorageMovi.queue.splice(ingexEl, 1);
      localStorage.setItem('watched', JSON.stringify(localStorageMovi));
      removeCurentBtn(targetEl);
    }
    textCurentBtnQueue(targetEl);
  };
}

// Додає/видаляє класс з кнопки

function addCurentInBtn(arr, element, btn) {
  if (arr.includes(element)) {
    addCurentBtn(btn);
  } else {
    removeCurentBtn(btn);
  }
}

function addCurentBtn(btn) {
  btn.classList.add('modal-movie__btn--curent');
  btn.dataset.ls = 'true';
}

function removeCurentBtn(btn) {
  btn.classList.remove('modal-movie__btn--curent');
  btn.dataset.ls = 'false';
}

// Змінює текст кнопки
function textCurentBtnWatched(btn) {
  if (btn.dataset.ls === 'false') {
    btn.innerHTML = 'add to Watched';
  } else {
    btn.innerHTML = 'remove to Watched';
  }
}

function textCurentBtnQueue(btn) {
  if (btn.dataset.ls === 'false') {
    btn.innerHTML = 'add to Queue';
  } else {
    btn.innerHTML = 'remove to Queue';
  }
}

// створює розмітку для модалки
function CardFilminHtml(data) {
  return `
    <img class="modal-movie__img" src="${
      data.poster_path
        ? 'https://image.tmdb.org/t/p/w500' + data.poster_path
        : 'https://via.placeholder.com/395x574'
    }" alt="${
    data.original_title || data.original_name
  }" width="240" height="357" />
    <div>
      <h1 class="modal-movie__title">${
        data.original_title || data.original_name
          ? data.original_title || data.original_name
          : ''
      }</h1>
      <ul class="modal-movie__list">
        <li class="modal-movie__item">
          <p class="modal-movie__item-categories">Vote / Votes</p>
          <p class="modal-movie__item-inf">
            <span class="modal-movie__item-vote">${data.vote_average}</span> /
            <span class="modal-movie__item-votes">${data.vote_count}</span>
          </p>
        </li>
        <li class="modal-movie__item">
          <p class="modal-movie__item-categories">Popularity</p>
          <p class="modal-movie__item-inf">${data.popularity}</p>
        </li>
        <li class="modal-movie__item">
          <p class="modal-movie__item-categories">Original Title </p>
          <p class="modal-movie__item-inf modal-movie__item-inf--uppercase">
            ${data.original_title}
          </p>
        </li>
        <li class="modal-movie__item">
          <p class="modal-movie__item-categories">Genre</p>
          <p class="modal-movie__item-inf">${data.genres[0].name}</p>
        </li>
      </ul>
      <h2 class="modal-movie__about">About</h2>
      <p class="modal-movie__about-text">
        ${data.overview}
      </p>
      <div class="modal-movie__btn-section">
        <button
            class="modal-movie__btn modal-movie__btn--margin modal-movie__btn-watched"
            type="button" data-ls='false'
          >
            add to Watched
          </button>
          <button class="modal-movie__btn modal-movie__btn-queue" type="button" data-ls='false'>add to queue</button>
      </div>
    </div>
      `;
}

// створює розмітку для модалки у випадку помилки
function CardFilminHtmlIfError(Error) {
  return `
    <div class="error-message">
    <h1>${Error.response.status}</h1>
    <h2>${Error.name}</h2>
    <h3>${Error.message}</h3>
<p>try later</p>
    </div>
    
      `;
}
function movieBtnHtml() {
  return `
        <button type="button" class="modal-movie__movie">
      <svg class="icon" width="14" height="14">
        <use xlink:href="/symbol-defs.a8b2e413.svg#icon-close"></use>
      </svg>
    </button>
    
      `;
}

function returnMovie(Movie) {
  return `
  <div class='movie-iframe'>
<iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="${Movie.name}" width="100%" height="100%" src="https://www.youtube.com/embed/${Movie.key}"></iframe>
  </div>
  `;
}

// id
// :
// "632e8350988afd007bf34a01"
// iso_639_1
// :
// "en"
// iso_3166_1
// :
// "US"
// key
// :
// "zUqIv5PvbGk"
// name
// :
// "Justin Long's New Movie | Official Trailer"
// official
// :
// true
// published_at
// :
// "2022-09-23T16:00:41.000Z"
// site
// :
// "YouTube"
// size
// :
// 1080
// type
// :
// "Teaser"
