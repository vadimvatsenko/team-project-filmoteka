export function createTopMovie(e, g) {
    return e.map(({ title, poster_path, release_date, vote_average, genre_ids}) => {

        console.log(g.genres);
        const newRealiseDate = release_date.slice(0, 4);

        return `<li class='movie-popular__item'>
       
        <img class='movie-popular__img' src="https://image.tmdb.org/t/p/w500${poster_path}"/>
        <div class = 'movie-popular__wrap-info'>
        <h3 class='movie-popular__title'>${title}</h3>
        <p class='movie-popular__release'>${newRealiseDate}</p>
        <p class='movie-popular__rating'>${vote_average}</p>
        <p class ='movie-popular__genres'>${genre_ids}</p>
        </div>
        </li>`
        
   
    }).join('');

}