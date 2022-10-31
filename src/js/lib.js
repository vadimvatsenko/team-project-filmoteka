import { paginationWatchid, paginationQueue } from "./pagination-lib";

const listWatched = document.querySelector('.movie-list');
const libSection = document.querySelector('.movie-popular-lib');
const bacgroundLib = document.querySelector('.bacground-lib');

const btnWatched = document.querySelector('.button-watched');
const btnQueue = document.querySelector('.button-queue');

btnWatched.addEventListener('click', rWatched);

btnQueue.addEventListener('click', rQueue);

const localWatched = JSON.parse(localStorage.getItem('watched')).watched;
const localQueue = JSON.parse(localStorage.getItem('watched')).queue;

export function rWatched() {
  getWatched("watched", 1)
  paginationWatchid();
  const localWatched = JSON.parse(localStorage.getItem('watched')).watched;
  if (localWatched.length === 0) {
    listWatched.innerHTML = '';
    libSection.classList.add('non-display');
    bacgroundLib.classList.remove('non-display');
  } else {
    libSection.classList.remove('non-display');
    bacgroundLib.classList.add('non-display');
  }

  btnWatched.classList.add('button--lib-active');
  btnQueue.classList.remove('button--lib-active');

  btnWatched.dataset.active = true;
  btnQueue.dataset.active = false;
}

export function rQueue() {
  getWatched("queue", 1)
  paginationQueue();
const localQueue = JSON.parse(localStorage.getItem('watched')).queue;
  if (localQueue.length === 0) {
    listWatched.innerHTML = '';
    libSection.classList.add('non-display');
    bacgroundLib.classList.remove('non-display');
  } else {
    libSection.classList.remove('non-display');
    bacgroundLib.classList.add('non-display');
  }

  btnQueue.classList.add('button--lib-active');
  btnWatched.classList.remove('button--lib-active');

  btnQueue.dataset.active = true;
  btnWatched.dataset.active = false;
}


if (localWatched.length === 0) {
  rQueue();
} else {
  rWatched();
}

export function getWatched(name, page) {
  const localWatched = JSON.parse(localStorage.getItem('watched'))[name];
  // console.log(localWatched);
  let begin = 20 * page -20;
  const end = 20 * page;
  if (page === 1) {
    begin = 0;
  }
  
  const slice = localWatched.slice(begin, end).join('');
  listWatched.innerHTML = slice;
}