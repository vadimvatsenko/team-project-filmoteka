const checkbox = document.querySelector('#theme-switch-toggle');
checkbox.addEventListener('change', changeTheme);
import { localStorageAPI } from "./localStorageAPI";

const Theme = {
   LIGHT: 'light-theme',
   DARK: 'dark-theme',
};

const bodyHtml = document.querySelector('body');

function changeTheme(evt) {
   if (evt.target.checked) {
      bodyHtml.classList.toggle(Theme.DARK);
      bodyHtml.classList.toggle(Theme.LIGHT);
      localStorage.setItem(localStorageAPI.KEYS.THEME, Theme.DARK);
   } else if (!evt.target.checked) {
      bodyHtml.classList.toggle(Theme.LIGHT);
      bodyHtml.classList.toggle(Theme.DARK);
      localStorage.setItem(localStorageAPI.KEYS.THEME, Theme.LIGHT);
   }
}

saveTheme();
function saveTheme() {
   const saveKey = localStorage.getItem(localStorageAPI.KEYS.THEME);
   if (!saveKey) {
      bodyHtml.classList.add(Theme.LIGHT);
      localStorage.setItem(localStorageAPI.KEYS.THEME, bodyHtml.classList);
   } else {
      bodyHtml.classList.add(saveKey);
      if (saveKey === Theme.DARK) {
         checkbox.checked = true;
      }
   }
}



