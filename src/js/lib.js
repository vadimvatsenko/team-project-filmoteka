import { async } from '@firebase/util';
import { getQueueFb, getWatchedFb } from './firebase';
import { paginationWatchid, paginationQueue } from './pagination-lib';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const listWatched = document.querySelector('.movie-list');
const libSection = document.querySelector('.movie-popular-lib');
const bacgroundLib = document.querySelector('.bacground-lib');

const btnWatched = document.querySelector('.button-watched');
const btnQueue = document.querySelector('.button-queue');

btnWatched.addEventListener('click', rWatched);

btnQueue.addEventListener('click', rQueue);

const localUserId = localStorage.getItem('id-user');
let localQueue = [];
let localWatched = [];

getOnlineOrOfflineStorage();

async function getOnlineOrOfflineStorage() {
  if (localUserId) {
    try {
      Loading.custom('Loading...', {
        customSvgCode:
          '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><linearGradient id="myG"  fy="0" gradientTransform="rotate(60 .5 .5)"><stop offset="0" stop-color="#f15361"></stop><stop offset=".25" stop-color="#ffffff"><animate attributeName="offset" dur="2s" values="0;1;0"repeatCount="indefinite" /></stop><stop offset="1" stop-color="#f15361"/></linearGradient><path d="M0 0V12H16V0H0ZM3 11H1V9H3V11ZM3 7H1V5H3V7ZM3 3H1V1H3V3ZM12 11H4V1H12V11ZM15 11H13V9H15V11ZM15 7H13V5H15V7ZM15 3H13V1H15V3ZM6 3V9L10 6L6 3Z" fill="url(#myG)"/></svg>',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      });
      localWatched = await getWatchedFb(localUserId);
      localQueue = await getQueueFb(localUserId);
      if (localWatched.length === 0) {
        rQueue();
      } else {
        rWatched();
      }
      Loading.remove(2000);
    } catch (error) {
      Loading.remove(2000);
      console.log(error);
    }
  } else {
    localWatched = JSON.parse(localStorage.getItem('watched')).watched;
    localQueue = JSON.parse(localStorage.getItem('watched')).queue;
    if (localWatched.length === 0) {
      rQueue();
    } else {
      rWatched();
    }
  }
}

export async function rWatched() {
  getWatched('watched', 1);
  paginationWatchid();
  let localWatched;
  if (localUserId) {
    try {
      localWatched = await getWatchedFb(localUserId);

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
    } catch (error) {
      console.log(error);
    }
  } else {
    localWatched = JSON.parse(localStorage.getItem('watched')).watched;

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
}

export async function rQueue() {
  getWatched('queue', 1);
  paginationQueue();

  let localQueue;

  if (localUserId) {
    try {
      localQueue = await getQueueFb(localUserId);
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
    } catch (error) {
      console.log(error);
    }
  } else {
    localQueue = JSON.parse(localStorage.getItem('watched')).queue;
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
}

export async function getWatched(name, page) {
  let localWatched;
  if (localUserId) {
    try {
      if (name === 'watched') {
        localWatched = await getWatchedFb(localUserId);
      } else {
        localWatched = await getQueueFb(localUserId);
      }
      let begin = 20 * page - 20;
      const end = 20 * page;
      if (page === 1) {
        begin = 0;
      }

      const slice = localWatched.slice(begin, end).join('');
      listWatched.innerHTML = slice;
    } catch (error) {
      console.log(error);
    }
  } else {
    localWatched = JSON.parse(localStorage.getItem('watched'))[name];

    let begin = 20 * page - 20;
    const end = 20 * page;
    if (page === 1) {
      begin = 0;
    }

    const slice = localWatched.slice(begin, end).join('');
    listWatched.innerHTML = slice;
  }

  // console.log(localWatched);
}
