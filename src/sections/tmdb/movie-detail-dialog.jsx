import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useDetailMovie } from '../../api/tmdb';
import { genre_join } from './util';

const uri = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/';
const uri2 = 'https://image.tmdb.org/t/p/w200';

export default function MovieDetailDialog({ dialogOpen, dialogHandle, id }) {
  const { isLoading, movie } = useDetailMovie(id);

  const handleClose = () => { dialogHandle(false); };

  return (
    <Dialog open={dialogOpen} onClose={handleClose} maxWidth='lg'>
      <DialogTitle>
				<Typography sx={{fontWeight: 'bold', fontSize: 18}}>영화 상세조회</Typography>
			</DialogTitle>
			<IconButton aria-label="close" onClick={handleClose}
				sx={{ position: 'absolute', right: 8, top: 8, }} >
				<CloseIcon />
			</IconButton>
      <DialogContent dividers>
        {movie &&
          <Stack spacing={2} direction='row' alignItems='center'>
            <Box component="img" src={uri + movie.poster_path} alt={movie.title}
              // sx={{ top: 0, width: 1, height: 1, objectFit: 'cover', position: 'absolute', }}
            />
            <Stack>
              <Typography variant='h3' gutterBottom>{movie.title}</Typography>
              <Typography variant='h6' color='textSecondary'>
                {movie.release_date}&nbsp;&middot;&nbsp;
                {genre_join(movie.genres)}&nbsp;&middot;&nbsp;
                {movie.runtime} 분
              </Typography>
              <Typography variant='h6' color='textSecondary' mb={5}>
                평점: {movie.vote_average} &nbsp;&nbsp;&nbsp;
                참가인원: {movie.vote_count}
              </Typography>
              <Typography variant='h5' color='textSecondary'>{movie.tagline}</Typography>
              <Typography variant='h5'>개요</Typography>
              <Typography variant='body2' mb={5}>{movie.overview}</Typography>
              <Stack direction='row' spacing={3}>
                {movie.production_companies.map(company => (
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Box component="img" src={uri + company.logo_path} alt={company.name}
                      sx={{ width: '32px' }}
                    />
                    <Typography variant='h6' color='textSecondary'>{company.name}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
        }     
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">확인</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}