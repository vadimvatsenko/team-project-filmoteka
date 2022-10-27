import {
  BASE_URL,
  KEY,
  IMG_URL,
  API_URL,
  POPULAR_URL,
  BASE_FIND_WORD_URL,
} from './url';
import { refs } from './refs';
import { pasteContent } from './createListItem';
import { spinerStart, spinerStop } from './spiner';

export function getMovieNameAPI(movie) {
  fetch(`${BASE_FIND_WORD_URL}&query=${movie}`)
    .then(response => {
      if (!response.ok) {
        throw (new Error(response.status), spinerStart);
      }
      return response.json();
    })
    .then(data => {
      spinerStart;
      console.log(data);
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

//! Фетч фільмів по назві фільма

/*
import { Loading } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { markupCreate } from './markupcreate';
import { refs } from './refs';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = 'key=30588481-828dd19e4086d4e0d5bf36dc4';

const params = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: `alt`,
  captionDelay: 250,
});

export async function getPhoto(query, page) {
  try {
    const urlSearh = `?${API_KEY}&q=${query}&page=${page}`;
    const { data } = await axios.get(urlSearh, { params });
    showMessage(data, page);
    markupCreate(data);
    lightbox.refresh();
    Loading.standard('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
  } catch (error) {
    Loading.standard('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
    Notify.failure(error.message);
    refs.loadMore.classList.add('hidden');
    console.error(error);
  } finally {
    Loading.remove(500);
  }
}

*/
