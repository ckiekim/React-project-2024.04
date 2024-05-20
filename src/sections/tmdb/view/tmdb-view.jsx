import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MovieCard from '../MovieCard';
import { usePopularMovies } from '../../../api/tmdb';

export default function TmdbView() {
  const { isLoading, error, movies } = usePopularMovies();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>영화 (TMDB)</Typography>

      {isLoading && <p>로딩중...</p>}
      {error && <Typography color="error">에러 발생: {error.message}</Typography>}
      {movies && 
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      }
    </Container>
  );
}