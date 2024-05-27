import { useState } from 'react';

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'

import Iconify from '../../components/iconify';

export default function BoardInsertDialog({ account }) {
  const { uid, displayName, avatarUrl } = account;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { 
    setOpen(false); 
  };
  const handleSubmit = () => {
    handleClose();
  }

  return (
    <>
      <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}>
        글 쓰기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>게시글 쓰기</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">등록</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}