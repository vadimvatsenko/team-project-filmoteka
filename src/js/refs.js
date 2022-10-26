// export function getRefs() {
//     return {
//         getTopMovie: document.querySelector('.movie-popular__list'),   це юл з куди вставляти розмітку
//         getSearchForm: document.querySelector('.header__form'),        форма сама вона нам не особо треба
//         getSpinner: document.querySelector('.spinner')
//     };
// };


export const refs = {
    list: document.querySelector('.movie-popular__list'),                  // це юл з куди вставляти розмітку              
    input: document.querySelector('.header__input'),                       // це поле куди треба уводити
    headerBtn: document.querySelector('.header__search-btn'),              // це кнопка відправки
    form: document.querySelector('.header__form'),                         // форма    
    
    getSpinner: document.querySelector('.spinner')
  };
