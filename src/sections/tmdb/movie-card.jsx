import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import MovieDetailDialog from './movie-detail-dialog';

const uri = 'https://image.tmdb.org/t/p/w200';

export default function MovieCard({ movie }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => { setOpen(true); };
  
  return (
    <>
      <Card sx={{ maxWidth: 345,  height: '100%', display: 'flex', 
          flexDirection: 'column', justifyContent: 'space-between',
          "&:hover": { transform: 'scale(1.05)', transition: 'transform 0.3s' } }}
      >
        <Link onClick={handleClickOpen}
          sx={{  '&:hover': { cursor: 'pointer', textDecoration: 'underline', }, }}
        >
          <Box sx={{ pt: '100%', position: 'relative' }}>
            <Box component="img" src={uri + movie.poster_path} alt={movie.title}
              sx={{ top: 0, width: 1, height: 1, objectFit: 'cover', position: 'absolute', }}
            />
          </Box>
        </Link>
        <CardContent sx={{ flexGrow: 1, display: 'flex', 
            flexDirection: 'column', justifyContent: 'flex-start' }}
        >
          <Typography variant='h5' component='div' gutterBottom>
            {movie.title}
          </Typography>
          <Typography color='textSecondary'>
            평점: {movie.vote_average}
          </Typography>
          <Typography color='textSecondary'>
            출시: {movie.release_date}
          </Typography>
        </CardContent>
      </Card>

      <MovieDetailDialog dialogOpen={open} dialogHandle={setOpen} id={movie.id} />
    </>
  );
}