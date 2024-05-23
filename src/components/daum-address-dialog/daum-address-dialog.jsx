import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export default function DaumAddressDialog({ handler }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  return (
    <>
      <Button onClick={handleClick} variant='outlined'>주소 찾기</Button>

      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>주소 찾기</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <DaumPostcode onComplete={handler} onClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">확인</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}