// создаем Observer
const observer = new IntersectionObserver(observerTriger);

const scrollBtn = document.querySelector('.scroll-btn'); // получаем ссылку на кнопуц
const scrollObservable = document.querySelector('.header'); // получаем ссылку на элемент после которого появился кнопку

observer.observe(scrollObservable); // вешаем observer на элемент
scrollBtn.addEventListener('click', onTopButton); // слушатель на кнопку скролла вверх

// если координаты больше чем 0, при нажатии на кнопку будет скрол вверх
function onTopButton() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

//функция отслеживания
function observerTriger(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      scrollBtn.classList.add('visually-hidden');
    } else {
      scrollBtn.classList.remove('visually-hidden');
    }
  });
}
