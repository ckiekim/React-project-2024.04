import { useState } from 'react';

import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AnnivInsertDialog from '../anniv-insert-dialog';

export default function SchedulePage() {
  const [year, setYear] = useState('2024');
  const [month, setMonth] = useState('05');

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">스케쥴러</Typography>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <IconButton>
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
          <IconButton>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography variant='h6'>{year}.{month}</Typography>
          <IconButton>
            <KeyboardArrowRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Stack>
        <AnnivInsertDialog />
      </Stack>
    </Container>
  )
}