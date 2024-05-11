import { useState } from 'react';
import { MuiFileInput } from 'mui-file-input';

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Iconify from '../../components/iconify';
import useUsers from './useUsers';
import { squareImage } from '../../api/cloudinary';

export default function UserInsertDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [userInfo, setUserInfo] = useState({name:'', email:'', company:'', role:''});
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { 
    setOpen(false); 
    setUserInfo({name:'', email:'', company:'', role:''});
    setFile();
  };
  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  const handleUpload = newFile => {
    setFile(newFile);
    squareImage(newFile)
      .then(url => setUserInfo({...userInfo, ['avatarUrl']: url}));
  }
  const { insertRecord } = useUsers();
  const handleSubmit = e => {
    e.preventDefault();
    insertRecord.mutate(userInfo);
    setOpen(false);
    setUserInfo({name:'', email:'', company:'', role:''});
    setFile();
  }

  return (
    <>
      <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}
       onClick={handleClickOpen}>
        New User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>사용자 등록</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ width: '40ch' }} alignItems="center">
            {file && <img src={userInfo.avatarUrl} alt='photo' width='80%' />}
            <TextField autoFocus required margin="dense" id="email"
              name="email" label="이메일" type="email" fullWidth
              defaultValue={userInfo.email} onChange={handleChange}
            />
            <TextField required margin="dense" id="name"
              name="name" label="이름" type="text" fullWidth
              defaultValue={userInfo.name} onChange={handleChange}
            />
            <TextField required margin="dense" id="company"
              name="company" label="회사" type="text" fullWidth
              defaultValue={userInfo.company} onChange={handleChange}
            />
            <TextField required margin="dense" id="role"
              name="role" label="역할" type="text" fullWidth
              defaultValue={userInfo.role} onChange={handleChange}
            />
            <MuiFileInput required margin="dense" id="photo"
              label='프로필 사진' value={file} name='file' fullWidth
              onChange={handleUpload} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">등록</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}