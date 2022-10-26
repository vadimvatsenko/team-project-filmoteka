export function createTopMovie(e) {
    return e.map(({ title, poster_path, release_date, vote_average, genre_ids }) => {
        
        const newRealiseDate = release_date.slice(0, 4);

        return `<li class='movie-popular__item'>
       
        <img class='movie-popular__img' src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}"/>
        <div class = 'movie-popular__wrap-info'>
        <h2 class='movie-popular__title'>${title}</h2>
        <p class='movie-popular__release'>${newRealiseDate}</p>
        <p class='movie-popular__rating'>${vote_average}</p>
        <p class ='movie-popular__genres'>${genre_ids}</p>
        </div>
        </li>`;
        
   
    }).join('');

}