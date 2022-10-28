// Закриття/відкриття модального вікна
export default class ModalClassic {
  // приймає саму модалку та кнопку закриття 
  constructor(modal, btnClose) {
    this.modal = document.querySelector(modal);
    this.btnClose = document.querySelector(btnClose);
  }
// Функція яка створює івенти для закриття модального вікна
  closingTracking() {
    const modalV = this.modal;
    const btnClose = this.btnClose;

    btnClose.addEventListener('click', clickInBtnClose);
    window.addEventListener('keydown', keydownInModal);
    modalV.addEventListener('click', clickInModal);

    function keydownInModal(e) {
      // console.log(e.code);
      if (e.code === 'Escape') {
        closeModal();
      }
    }

    function clickInModal(e) {
      // console.log(e);
      if (e.target === e.currentTarget) {
        closeModal();
      }
    }

    function clickInBtnClose(e) {
      closeModal();
    }

    function closeModal() {
      modalV.classList.add('is-hidden');
      document.body.classList.remove('body--hidden');
      window.removeEventListener('keydown', keydownInModal);
    }
  }
// функція яка відкриває модальне вікно
  openModal() {
    this.modal.classList.remove('is-hidden');
    document.body.classList.toggle('body--hidden');
    this.closingTracking();
  }
}
