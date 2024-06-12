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
import useMediaQuery from '@mui/material/useMediaQuery';

import { useDetailMovie } from '../../api/tmdb';
import { genre_join } from './util';
import { fCurrency } from '../../utils/format-number';

const uri = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2';  // poster
const uri2 = 'https://image.tmdb.org/t/p/w200';     // logo

export default function MovieDetailDialog({ dialogOpen, dialogHandle, id }) {
  const { movie } = useDetailMovie(id);
  const isSmDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

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
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              {movie.poster_path ?
                <Box component="img" src={uri + movie.poster_path} alt={movie.title} />
                :
                <Box component="img" src='/assets/img/film_icon.png' alt={movie.title} />
              }
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack sx={{ flexGrow: 1, display: 'flex', 
                  flexDirection: 'column', justifyContent: 'flex-start' }}
              >
                <Typography variant='h3' gutterBottom>{movie.title}</Typography>
                <Typography variant='h6' color='textSecondary'>
                  {movie.release_date}&nbsp;&middot;&nbsp;
                  {genre_join(movie.genres)}&nbsp;&middot;&nbsp;
                  {movie.runtime} 분
                </Typography>
                <Typography variant='h6' color='textSecondary' mb={5}>
                  평점: {movie.vote_average} &nbsp;&nbsp;&nbsp;
                  참가인원: {fCurrency(movie.vote_count)}
                </Typography>
                <Typography variant='h5' color='textSecondary' gutterBottom>
                  {movie.tagline}
                </Typography>
                <Typography variant='h5'>개요</Typography>
                <Typography variant='body2' mb={5}>{movie.overview}</Typography>
                <Stack 
                  direction={isSmDown ? 'column' : 'row'} 
                  spacing={isSmDown ? 1 : 3} 
                  flexWrap="wrap"
                >
                  {movie.production_companies.map((company) => (
                    <Stack key={company.id} direction='row' spacing={1} pb={1}>
                      {company.logo_path &&
                        <Box component="img" src={uri2 + company.logo_path} alt={company.name}
                          sx={{ height: '32px' }}
                        />
                      }
                      <Typography variant='h6' color='textSecondary'>{company.name}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        }     
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">확인</Button>
      </DialogActions>
    </Dialog>
  )
}