import CircularProgress from '@mui/material/CircularProgress';
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