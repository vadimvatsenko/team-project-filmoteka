const API_KEY = '137ae7e6367e772dd156f1aad841f871';


const getTopMovie = document.querySelector('.top-movie__list');


const test = fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`).then(response => response.json()).then(data => {
    console.log(data.results)
    const R = data.results.map(({ title, poster_path
 }) => {
        console.log(title)
        console.log(poster_path);
        return `<li>
       
        <img src="https://image.tmdb.org/t/p/w500${poster_path}"/>
        </li>`
        
    }).join('')

    getTopMovie.innerHTML = R;
    
 })






