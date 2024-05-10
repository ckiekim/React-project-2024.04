import { useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Iconify from '../../components/iconify';
import { genTime } from "./util";
import useSched from './useSched';

export default function SchedInsertDialog({ ymd }) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [sched, setSched] = useState({ title: '', sdate: ymd });
  const timeList = genTime();

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { 
    setOpen(false); 
    setSched({ title: '', sdate: ymd });
    setChecked(false);
  };
  const handleChange = e => {
    setSched({...sched, [e.target.name]: e.target.value});
  }
  const { insertRecord } = useSched();
  const handleSubmit = () => {
    const newSched = {...sched, email: sessionStorage.getItem('sessionEmail'), isHoliday: checked}
    // insertRecord.mutate(newSched);
    console.log(newSched);
    handleClose();
  }

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>일정 등록</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ width: '40ch' }} alignItems="center">
            <Stack direction='row' spacing={1}>
              <FormGroup>
                <FormControlLabel label="중요"
                  control={
                    <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
                  }  
                />
              </FormGroup>
              <TextField autoFocus required margin="dense" id="title"
                name="title" label="일정명" type="text" fullWidth
                defaultValue={sched.title} onChange={handleChange}
              />
            </Stack>
            <Stack direction='row' spacing={1}>
              <TextField required margin="dense" id="sdate"
                name="sdate" label="날짜" type="text" fullWidth
                value={sched.sdate} onChange={handleChange}
              />
              <FormControl fullWidth>
                <InputLabel id="startTime">시작시간</InputLabel>
                <Select required margin="dense" name='startTime' label="시작시간" id='startTime'
                  defaultValue={sched.startTime} onChange={handleChange}>
                  {timeList.map((item) => 
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Stack>
            <TextField required margin="dense" id="place"
              name="place" label="장소" type="text" fullWidth
              defaultValue={sched.place} onChange={handleChange}
            />
            <TextField margin="dense" id="memo"
              name="memo" label="메모" type="text" fullWidth
              defaultValue={sched.memo} onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">제출</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}