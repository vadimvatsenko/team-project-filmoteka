import { BASE_URL, KEY, IMG_URL, API_URL , POPULAR_URL, BASE_FIND_WORD_URL } from "./url"
import { refs  } from './refs';
import { pasteContent } from "./createListItem"

export function getMovieNameAPI(movie) {
fetch(`${BASE_FIND_WORD_URL}&query=${movie}`)
.then(response => {
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
})
.then(data => {
  console.log(data);

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

//! Фетч фільмів по назві фільма