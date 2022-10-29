import { genres } from './genres.json';

export function getfilmsGenres(ids) {
  let filmsGenres = genres.reduce((acc, { id, name }) => {
    if (ids.includes(id)) {
      acc.push(name);
    }
    // console.log(acc);
    return acc;
  }, []);
  // console.log(filmsGenres);
  return filmsGenres;
}
