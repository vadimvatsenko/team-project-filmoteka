import { BASE_URL, KEY, IMG_URL, API_URL, POPULAR_URL } from './url';
import { refs } from './refs';
import errorImg from '../images/catch-error.jpg';
// renderTrendingFilms();

export function initializeSlider() {
  $('.slider').slick({
    arrows: false,
    lazyLoad: 'progressive',
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 8,
    infinite: true,
    speed: 1000,
    // adaptiveHeigt: true,
  });
}

export function resetSlider() {
  $('.slider').slick('unslick');
}

// function renderTrendingFilms() {
//   const trendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=1e446ea557eeddab870c9b0dcf9bfa4f`;
//   return fetch(trendingUrl)
//     .then(response => response.json())
//     .then(({ results }) => {
//       return results;
//     })
//     .then(renderSliderFilms)
//     .catch(error => {
//       slickSlider.innerHTML = `<img class="catch-error-img" src="${errorImg}"/>`;
//     });
// }

// function filmCardSlider(films) {
//   return films
//     .map(({ poster_path, original_title, original_name, id, vote_average }) => {
//       return `
//       <div class="slider__item">
//         <img loading="lazy" class="slider-image" src="${IMG_URL}${poster_path}" alt="${original_title} ${original_name}"
//         data-id="${id}" onerror="this.onerror=null;this.src='https://i.postimg.cc/6pzyh7Wc/pngwing-com.png';" />
//         <span class="trending-raiting">${vote_average}</span>
//       </div>`;
//     })
//     .join('');
// }

// function renderSliderFilms(articles) {
//   refs.slickSlider.innerHTML = filmCardSlider(articles);
//   initializeSlider();
// }
