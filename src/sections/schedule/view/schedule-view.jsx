import { useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function SchedulePage() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState({val1: '', val2: ''});
  const handleChange = e => {
    setData({...data, [e.target.name]: e.target.value});
  }
  const handleSubmit = e => {
    e.preventDefault();
    sessionStorage.setItem('globalData', JSON.stringify(data));
  }

  return (
    <Container>
      <Typography variant="h4">Schedule</Typography>
      <TextField name='val1' defaultValue={data.val1} onChange={handleChange} />
      <TextField name='val2' defaultValue={data.val2} onChange={handleChange} />
      <Button onClick={handleSubmit}>제출</Button>
    </Container>
  )
}