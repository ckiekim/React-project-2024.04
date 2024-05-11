import { useEffect, useState } from 'react';
import { MuiFileInput } from 'mui-file-input';

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Iconify from '../../components/iconify';
import useUsers from './useUsers';
import { getUser } from '../../api/firebase';
import { uploadImage } from '../../api/cloudinary';

export default function UserUpdateDialog({ id, callback }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [userInfo, setUserInfo] = useState({});
  const handleClickOpen = () => { 
    setOpen(true); 
  };
  const handleClose = () => { 
    setOpen(false); 
    callback(null);
  };
  const handleChange = e => {
    setUserInfo(userInfo => ({...userInfo, [e.target.name]: e.target.value}));
  }
  const handleUpload = newFile => {
    setFile(newFile);
    uploadImage(newFile)
      .then(url => setUserInfo(userInfo => ({...userInfo, ['avatarUrl']: url})));
  }
  const { updateRecord } = useUsers();
  const handleSubmit = e => {
    e.preventDefault();
    updateRecord.mutate(userInfo);
    setOpen(false);
    callback(null);
  }
  useEffect(() => {
    getUser(id)
      .then(setUserInfo);
  }, []);

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} /> 수정
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>사용자 수정</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        {userInfo && <DialogContent dividers>
          <Stack spacing={2} sx={{ width: '40ch' }} alignItems="center">
            {userInfo && <img src={userInfo.avatarUrl} alt='photo' width='80%' />}
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
        </DialogContent>}
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">수정</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}