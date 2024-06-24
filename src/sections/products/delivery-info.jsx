import React, { useMemo } from 'react';

import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import DaumAddressDialog from '../../components/daum-address-dialog';
import PhoneNumberInput from '../../components/phone-number-input';

export default function DeliveryInfo({ zoneCode, addr1, addr2, tel, memo, setZoneCode, setAddr1, setAddr2, setTel, setMemo }) {
	const deliveryMemos = useMemo(() => 
		['선택 안 함', '문앞에 놓아주세요', '부재시 연락 부탁드려요', 
			'배송 전 미리 연락해 주세요', '부재시 1층 택배 보관장소에 맡겨주세요'], []);
	const handleComplete = data => {
		setZoneCode(data.zonecode);
		setAddr1(data.address);
	}

  return (
    <>
      <Typography variant='h5'>배송정보</Typography>
      <Stack alignItems='center' spacing={0.1}>
        <Grid container alignItems='center' spacing={1}>
          <Grid item xs={6}>
            <TextField value={zoneCode} label="우편번호" variant="standard" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <DaumAddressDialog handler={handleComplete} />
          </Grid>
        </Grid>
        <Grid container alignItems='center' spacing={1}>
          <Grid item xs={12}>
            <TextField margin="dense" value={addr1} label="기본주소" variant="standard" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required margin="dense" value={addr2} label="상세주소" fullWidth onChange={e => setAddr2(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhoneNumberInput tel={tel} setTel={setTel} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="memo">배송메모</InputLabel>
              <Select required margin="dense" name='memo' label="배송메모" id='memo' value={memo} onChange={e => setMemo(e.target.value)}>
                {deliveryMemos.map(delMemo => (
                  <MenuItem value={delMemo} key={'e'+delMemo}>
                    {delMemo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}