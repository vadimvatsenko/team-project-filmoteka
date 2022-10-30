const listWatched = document.querySelector('.movie-list');
const libSection = document.querySelector('.movie-popular-lib');
const bacgroundLib = document.querySelector('.bacground-lib');

const btnWatched = document.querySelector('.button-watched');
const btnQueue = document.querySelector('.button-queue');

btnWatched.addEventListener('click', rWatched);

btnQueue.addEventListener('click', rQueue);

export function rWatched() {
  const localWatched = JSON.parse(localStorage.getItem('watched')).watched;
  listWatched.innerHTML = localWatched.join('');
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
}

export function rQueue() {
  const localQueue = JSON.parse(localStorage.getItem('watched')).queue;
  listWatched.innerHTML = localQueue.join('');
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
}

const localWatched = JSON.parse(localStorage.getItem('watched')).watched;
if (localWatched.length === 0) {
  rQueue();
} else {
  rWatched();
}
