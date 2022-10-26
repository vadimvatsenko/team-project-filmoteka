import { BASE_URL, KEY, IMG_URL, API_URL, POPULAR_URL } from "./url"
import { refs  } from './refs';
import { pasteContent } from "./createListItem"

export function getAPI(url) {
    fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    if(data.results.length !== 0){
        pasteContent(data.results);
    } else {
        refs.list.innerHTML = `<h1 class="list__nofind">No movies found on request :(</h1>`
    }
  })
  .catch(error => {
    console.log('error', error);
  });
}

//! Фетч популярних фільмів, по дефолту при відкритті або перезагрузці сайту