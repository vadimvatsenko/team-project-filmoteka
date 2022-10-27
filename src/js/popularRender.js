import { BASE_URL, KEY, IMG_URL, API_URL, POPULAR_URL } from './url';
import { refs } from './refs';
import { pasteContent } from './createListItem';
import { spinerStart, spinerStop } from './spiner';

export function getAPI(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw (new Error(response.status), spinerStart);
      }
      return response.json();
    })
    .then(data => {
      spinerStart;

      if (data.results.length !== 0) {
        pasteContent(data.results);
      } else {
        spinerStart;

        refs.list.innerHTML = `<h1 class="list__nofind">No movies found on request :(</h1>`;
      }
    })
    .catch(error => {
      console.log('error', error);
    })

    .finally(() => {
      spinerStop;
    });
}

//! Фетч популярних фільмів, по дефолту при відкритті або перезагрузці сайту
