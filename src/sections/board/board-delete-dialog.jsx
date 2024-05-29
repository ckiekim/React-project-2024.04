import { useState } from 'react';

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography'

import Iconify from '../../components/iconify';
import useBoard from './useBoard';

export default function BoardDeleteDialog({ board, account, onClose }) {
  const [open, setOpen] = useState(false);
  const { deleteRecord } = useBoard();

  const handleOpen = () => {
    if (account.uid !== board.writer.uid) {
      onClose();
      return null;
    } else 
      setOpen(true);
  }
  const handleClose = () => { setOpen(false); };
  const handleDelete = () => {
    setOpen(false);
    deleteRecord.mutate(board.bid);
    onClose();
  }

  return (
    <>
      <MenuItem key='2' sx={{ color: 'primary.main' }} onClick={handleOpen}>
        <Iconify icon="tabler:trash" sx={{ mr: 2 }} />
        삭제
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>게시글 삭제</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography p={5} variant='h5'>정말로 삭제하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="contained">삭제</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}