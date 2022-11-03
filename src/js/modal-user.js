import { refs } from './refs';
import ModalClassic from './modalClassic';
import {
  createUser,
  singInAccount,
  createNewUser,
  getWatched,
  getQueue,
  getUserInfo,
} from './firebase';
import { Notify } from 'notiflix';
import { Loading } from 'notiflix';

const ModalReg = new ModalClassic(
  '.wrapper-modal-user',
  '.modal-user__btn-close'
);

// check auth
const checkAuth = localStorage.getItem('email-user');

if (checkAuth) {
  refs.loginBtn.innerHTML = checkAuth;
}

refs.loginBtn?.addEventListener('click', singOutHandler);

const formRegister = document.querySelector('.modal-register');
formRegister?.addEventListener('click', registrationHandler);

async function registrationHandler(evt) {
  evt.preventDefault();
  const user = {
    email: evt.currentTarget['email-reg'].value,
    password: evt.currentTarget['password-reg'].value,
  };

  const typeBtn = evt.path[0].name;

  if (typeBtn === 'btn-auth') {
    try {
      const dataUser = await singInAccount(user.email, user.password);
      saveDataAndCloseModal(dataUser.user.uid, user.email);
      Notify.success(`Welcome back!`);
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  } else if (typeBtn === 'btn-reg') {
    try {
      const dataUser = await createUser(user.email, user.password);
      saveDataAndCloseModal(dataUser.user.uid, user.email);
      createNewUser({ id: dataUser.user.uid, email: user.email });
      Notify.success(`Succes! Your email: ${user.email}`);
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
}

const refSignOutBtn = document.querySelector('.sign-out__button');
refSignOutBtn?.addEventListener('click', evt => {
  localStorage.removeItem('id-user');
  localStorage.removeItem('email-user');
  location.reload();
});

function saveDataAndCloseModal(id, email) {
  localStorage.setItem('id-user', id);
  localStorage.setItem('email-user', email);
  refs.loginBtn.innerHTML = email;

  ModalReg.modal.classList.add('is-hidden');
  document.body.classList.remove('body--hidden');
}

async function singOutHandler() {
  const refAcc = {
    wrap: document.querySelector('.sign-out__wrap'),
    register: document.querySelector('.modal-register'),
    email: document.querySelector('.account-info__email'),
    watched: document.querySelector('.account-info__count-watched'),
    queue: document.querySelector('.account-info__count-queue'),
  };

  const emailLocal = localStorage.getItem('email-user');

  if (emailLocal) {
    const userId = localStorage.getItem('id-user');
    try {
      Loading.custom('Loading...', {
        customSvgCode:
          '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><linearGradient id="myG"  fy="0" gradientTransform="rotate(60 .5 .5)"><stop offset="0" stop-color="#f15361"></stop><stop offset=".25" stop-color="#ffffff"><animate attributeName="offset" dur="2s" values="0;1;0"repeatCount="indefinite" /></stop><stop offset="1" stop-color="#f15361"/></linearGradient><path d="M0 0V12H16V0H0ZM3 11H1V9H3V11ZM3 7H1V5H3V7ZM3 3H1V1H3V3ZM12 11H4V1H12V11ZM15 11H13V9H15V11ZM15 7H13V5H15V7ZM15 3H13V1H15V3ZM6 3V9L10 6L6 3Z" fill="url(#myG)"/></svg>',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      });
      const dataUser = await getUserInfo(userId);
      Loading.remove(100);
      ModalReg.openModal();
      refAcc.wrap.classList.remove('visually-hidden');
      refAcc.register.classList.add('visually-hidden');

      refAcc.email.innerHTML = `Your email: <b>${emailLocal}</b>`;
      refAcc.watched.innerHTML = `You watched: <b>${dataUser.watched.length}</b> films!`;
      refAcc.queue.innerHTML = `You added to queue: <b>${dataUser.queue.length}</b> films!`;
    } catch (error) {
      console.log(error);
    }
  } else {
    ModalReg.openModal();
  }
}
