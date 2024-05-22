import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function LoadingProgress() {
  return (
    <Stack direction='row' spacing={2} sx={{ display: 'flex' }}>
      <CircularProgress />
      <Typography>로딩중...</Typography>
    </Stack>
  );
}