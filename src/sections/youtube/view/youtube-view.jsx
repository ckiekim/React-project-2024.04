import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import DaumAddressDialog from '../daum-address-dialog';

export default function YoutubeView() {
  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');
  const [zoneCode, setZoneCode] = useState('');

  const handleComplete = data => {
    setZoneCode(data.zonecode);
    setAddr1(data.address);
    console.log(data);
  }

  return (
    <Container>
      <Typography variant="h4" mb={5}>Youtube</Typography>
      
      <Stack spacing={2}>
        <TextField value={zoneCode} label="우편번호" variant="standard" />
        <TextField value={addr1} label="기본주소" variant="standard" />
        <TextField defaultValuealue={addr2} label="상세주소" onChange={e => setAddr2(e.target.value)} />
        <DaumAddressDialog handler={handleComplete} />
        
      </Stack>
    </Container>
  )
}