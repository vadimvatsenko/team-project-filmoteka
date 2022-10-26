import { fetchCardFilm } from './url';

const modalMoviInfo = document.querySelector('.modal-movie__backdrop');
const modalMovi = document.querySelector('.modal-movie__container');
const modalMoviInfoBtn = document.querySelector('.modal-movie__btn-close');

const movieDiv = document.querySelector('.movie-popular');

movieDiv.addEventListener('click', openModalInfo);
modalMoviInfoBtn.addEventListener('click', closeModalInfo);

async function openModalInfo(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'LI') {
    return;
  }
  console.log(e.target);
  modalMovi.innerHTML = '';
  modalMoviInfo.classList.remove('visually-hidden');

  const idMovie = e.target.dataset.id;
  const PixabaySeach = await fetchCardFilm(idMovie);
  modalMovi.innerHTML = PixabaySeach;
}

function closeModalInfo() {
  modalMovi.innerHTML = '';
  modalMoviInfo.classList.add('visually-hidden');
}
