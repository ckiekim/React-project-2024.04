import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function MovieCard({ movie }) {
  const uri = 'https://image.tmdb.org/t/p/w200';
  
  return (
    <>
      <Card sx={{ maxWidth: 345, "&:hover": { transform: 'scale(1.05)', transition: 'transform 0.3s' } }}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <Box component="img" src={uri + movie.poster_path} alt={movie.title}
            sx={{ top: 0, width: 1, height: 1, objectFit: 'cover', position: 'absolute', }}
          />
        </Box>
        <CardContent>
          <Typography variant='h5' component='div' gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant='body2'>{movie.overview}</Typography>
        </CardContent>
      </Card>
    </>
  );
}