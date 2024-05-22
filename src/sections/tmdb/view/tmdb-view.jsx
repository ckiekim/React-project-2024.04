import { useState } from 'react';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MovieCard from '../movie-card';
import LoadingProgress from '../../../components/loading-progress';
import { useMovies } from '../../../api/tmdb';

export default function TmdbView() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const { isLoading, error, movies } = useMovies(keyword, page);

  const handleSubmit = e => {
    e.preventDefault();
    setKeyword(text);
    setText('');
    setPage(1);
  }

  const handlePageChange = (e, value) => {
    setPage(value);
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

      {isLoading && <LoadingProgress />}
      {error && <Typography color="error">에러 발생: {error.message}</Typography>}
      {movies && 
        <Stack spacing={3} justifyContent='center' alignItems='center'>
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          <Pagination count={10} page={page} onChange={handlePageChange} color="primary" />
        </Stack>
      }
    </Container>
  );
}