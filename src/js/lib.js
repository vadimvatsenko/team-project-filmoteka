import { async } from '@firebase/util';
import { getQueueFb, getWatchedFb } from './firebase';
import { paginationWatchid, paginationQueue } from './pagination-lib';

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
      localWatched = await getWatchedFb(localUserId);
      localQueue = await getQueueFb(localUserId);

      if (localWatched.length === 0) {
        rQueue();
      } else {
        rWatched();
      }
    } catch (error) {
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
