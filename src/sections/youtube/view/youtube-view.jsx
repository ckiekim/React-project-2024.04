import { useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function YoutubePage() {
  const [page, setPage] = useState(0);
  return (
    <Container>
      <Typography variant="h4">Youtube</Typography>
    </Container>
  )
}