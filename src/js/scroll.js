import throttle from 'lodash.throttle';

export { onScroll, onTopButton }; // экспортируем функции в index.js

const scrollBtn = document.querySelector('.scroll-btn');// получаем ссылку на кнопуц


window.addEventListener('scroll', throttle(onScroll, 250));// слушатель окна на скролл
scrollBtn.addEventListener('click', onTopButton);// слушатель на кнопку скролла вверх

function onScroll() {
    const scrolled = window.pageYOffset;//текущая позиция по Y
    const coords = document.documentElement.clientHeight; // высота докумета

    if (scrolled < coords) { // если скрол меньше высоты документа - добавить класс на кнопку и скрыть ее
        scrollBtn.classList.add('visually-hidden');
    }

    if (scrolled > coords) { // показать кнопку
        scrollBtn.classList.remove('visually-hidden');
    }
}

function onTopButton() { // если координаты больше чем 0, при нажатии на кнопку будет скрол вверх
    if (window.pageYOffset > 0) {
        window.scrollTo(
            { top: 0, behavior: 'smooth' }
        );
    }
}