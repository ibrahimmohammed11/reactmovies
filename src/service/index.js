import axios from "axios";

export async function getMovie(mediaType) {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${mediaType}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&page=1`
  );
  return data;
}
export async function getGenre() {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
  );
  return data;
}
export async function getTrendingPerson() {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/person/week?api_key=f1aca93e54807386df3f6972a5c33b50`
  );
  return data;
}
export async function getMovieByGenre(genre_id) {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=f1aca93e54807386df3f6972a5c33b50&with_genres=${genre_id}`
  );
  return data;
}
export async function getMovieDetails(id) {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
  );
  return data;
}

export async function getMovieCast(id) {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
  );
  return data;
}

export async function getSimilarMovie(id) {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
  );
  return data;
}

export async function getMovieVideo(id) {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
  );
  return data["results"][0];
}

export async function searchMovie(searchText) {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&query=${searchText}&page=1&include_adult=false`
  );
  return data;
}
