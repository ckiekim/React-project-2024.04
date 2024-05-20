import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const URL = 'https://api.themoviedb.org/3/movie';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const usePopularMovies = () => {
  const { isLoading, error, data: movies } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      // const uri = URL + '/popular?api_key=' + API_KEY;
      return axios
              .get('/data/mock_popular_movies.json')
              // .get(uri)
              .then(res => res.data.results);
    },
    staleTime: 1000 * 60 * 5
  });
  return { isLoading, error, movies };
}
