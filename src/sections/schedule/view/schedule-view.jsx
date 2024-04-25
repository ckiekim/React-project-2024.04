import { useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function SchedulePage() {
  const [page, setPage] = useState(0);
  return (
    <Container>
      <Typography variant="h4">Schedule</Typography>
    </Container>
  )
}