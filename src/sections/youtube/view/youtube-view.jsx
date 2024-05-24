
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function YoutubeView() {

  return (
    <Container>
      <Typography variant="h4" mb={5}>Youtube</Typography>
      
      <Button variant='outlined'>
        TOSS API 결제하기
      </Button>
    </Container>
  );
}