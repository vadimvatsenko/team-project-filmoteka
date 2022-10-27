export default class ModalClassic {
  constructor(modal, btnClose) {
    this.modal = modal;
    this.btnClose = btnClose;
  }

  keydownTest() {
    const modalV = this.modal;
    const btnClose = this.btnClose;
    const btnCloseinBody = document.querySelector(btnClose);

    btnCloseinBody.addEventListener('click', clickInBtnClose);
    window.addEventListener('keydown', keydownInModal);
    modalV.addEventListener('click', clickInModal);

    function keydownInModal(e) {
      // console.log(e.code);
      if (e.code === 'Escape') {
        modalV.classList.add('is-hidden');
        document.body.classList.remove('body--hidden');
        window.removeEventListener('keydown', keydownInModal);
      }
    }
    function clickInModal(e) {
      // console.log(e);
      if (e.target === e.currentTarget) {
        modalV.classList.add('is-hidden');
        document.body.classList.remove('body--hidden');
        window.removeEventListener('keydown', keydownInModal);
      }
    }

    function clickInBtnClose(e) {
      modalV.classList.add('is-hidden');
      document.body.classList.remove('body--hidden');
      window.removeEventListener('keydown', keydownInModal);
    }
  }

  closeModal() {
    // console.log(this.modal);
    this.modal.classList.add('is-hidden');
    document.body.classList.toggle('body--hidden');
  }

  openModal() {
    // console.log(this.modal);
    this.modal.classList.remove('is-hidden');
    document.body.classList.toggle('body--hidden');
  }
}
