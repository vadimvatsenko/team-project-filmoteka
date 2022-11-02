import { refs } from './refs';
import ModalClassic from './modalClassic';
import { createUser } from './firebase';

const ModalReg = new ModalClassic(
  '.wrapper-modal-user',
  '.modal-user__btn-close'
);

refs.loginBtn?.addEventListener('click', evt => {
  ModalReg.openModal();
});

const formRegister = document.querySelector('.modal-register');

console.log(formRegister);

formRegister?.addEventListener('submit', registrationHandler);

function registrationHandler(evt) {
  evt.preventDefault();
  const user = {
    email: evt.currentTarget['email-reg'].value,
    password: evt.currentTarget['password-reg'].value,
  };
  //   console.log(user);
  const result = createUser(user.email, user.password)
    .then(data => {
      console.log(data.uid);
      localStorage.setItem('id-user', data.uid);
      ModalReg.modal.classList.add('is-hidden');
      document.body.classList.remove('body--hidden');
      window.removeEventListener('keydown', keydownInModal);
    })
    .catch(e => {
      console.log(e);
    });
}
