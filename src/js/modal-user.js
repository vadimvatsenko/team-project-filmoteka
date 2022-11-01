import { refs } from './refs';
import ModalClassic from './modalClassic';
import { createUser } from './firebase';

const Modal = new ModalClassic('.wrapper-modal-user', '.modal-user__btn-close');

refs.loginBtn?.addEventListener('click', evt => {
  Modal.openModal();
});

const formRegister = document.querySelector('.modal-register');

formRegister.addEventListener('submit', evt => {
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
    })
    .catch(e => {
      console.log(e);
    });

  //   console.log(evt.currentTarget['email-reg'].value);
});
