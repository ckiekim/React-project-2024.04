import { useState } from 'react';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MovieCard from '../movie-card';
import { useMovies } from '../../../api/tmdb';

export default function TmdbView() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');
  const { isLoading, error, movies } = useMovies(keyword, '1');

  const handleSubmit = e => {
    e.preventDefault();
    setKeyword(text);
    setText('');
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4"> 영화 (TMDB)</Typography>
        <Grid item xs={7} md={6} lg={4}>
          <Paper
            component="form" onSubmit={handleSubmit}
            sx={{ p:'2px 4px', display:'flex', alignItems:'center', width:'100%' }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="검색..."
              value={text} 
              onChange={e => setText(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: 1 }} aria-label="search" onClick={handleSubmit}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Stack>

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