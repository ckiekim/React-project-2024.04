import { useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function YoutubeView() {
  const [page, setPage] = useState(0);
  const globalData = JSON.parse(sessionStorage.getItem('globalData'));

  return (
    <Container>
      <Typography variant="h4">Youtube</Typography>
      {globalData && 
        <>
          <Typography>{globalData.val1}</Typography><br />
          <Typography>{globalData.val2}</Typography><br />
        </>
      }
    </Container>
  )
}