import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const useDetailMovie = (id) => {
  const { isLoading, error, data: movie } = useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      const uri = URL + '/movie/' + id + '?language=ko&api_key=' + API_KEY;
      return axios
              .get('/data/mock_detail_movie.json')
              // .get(uri)
              .then(res => {
                console.log(res); return res.data;
              });
              // .then(res => res.data);
    },
    staleTime: 1000 * 60 * 5
  });
  return { isLoading, error, movie };
}

export const useMovies = (keyword, page) => {
  // let uri = URL + '/movie/popular?api_key=' + API_KEY;
  let uri = '/data/mock_popular_movies.json';
  if (keyword) {
    // uri = URL + '/search/movie?query=' + encodeURI(keyword) + '&api_key=' + API_KEY;
    uri = '/data/mock_search_movies.json';
  }
  const { isLoading, error, data: movies } = useQuery({
    queryKey: ['movies', keyword ? keyword : ''],
    queryFn: async (keyword) => {
      return axios
              .get(uri)
              .then(res => res.data.results);
    },
    staleTime: 1000 * 60 * 5
  });
  return { isLoading, error, movies };
}
