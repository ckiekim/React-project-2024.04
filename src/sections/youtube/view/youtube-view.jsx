
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import MyEditor from '../my-editor';

export default function YoutubeView() {

  return (
    <Container>
      <Typography variant="h4" mb={5}>Youtube</Typography>
      
      <MyEditor />
      
    </Container>
  );
}