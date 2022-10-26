const modalMoviInfo = document.querySelector('.modal-movie__backdrop')
const modalMoviInfoBtn = document.querySelector('.modal-movie__btn-close')

const movieDiv = document.querySelector('.movie-popular')

movieDiv.addEventListener('click', openModalInfo);
modalMoviInfoBtn.addEventListener('click', closeModalInfo);

function openModalInfo(e) {
    e.preventDefault();
    if (e.target.nodeName !== "LI") {
    return;
    }
    console.log(e.target);
    modalMoviInfo.classList.remove('visually-hidden');
}

function closeModalInfo() {
     modalMoviInfo.classList.add('visually-hidden');
}
