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
import useMediaQuery from '@mui/material/useMediaQuery';

import Iconify from '../../components/iconify';
import useUserInfo from '../../hooks/useUserInfo';
import { squareImage } from '../../api/cloudinary';

export default function UserInfoUpdateDialog({ user, callback }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [userInfo, setUserInfo] = useState();
  const isSmUp = useMediaQuery(theme => theme.breakpoints.up('sm'));

  const handleClickOpen = () => { 
    const sessionUid = sessionStorage.getItem('sessionUid');
    if (sessionUid === user.uid)
      setOpen(true); 
    else
      callback(null);
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
    squareImage(newFile)
      .then(url => setUserInfo(userInfo => ({...userInfo, avatarUrl: url})));
  }
  const { updateRecord } = useUserInfo();
  const handleSubmit = e => {
    e.preventDefault();
    updateRecord.mutate(userInfo);
    setOpen(false);
    callback(null);
  }
  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} /> 수정
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>사용자 정보 수정</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        {userInfo && <DialogContent dividers>
          <Stack 
            spacing={2} alignItems="center"
            sx={{ width: isSmUp ? '40ch' : 'auto' }} 
          >
            {userInfo && <img src={userInfo.avatarUrl} alt={userInfo.email} width='80%' />}
            <TextField disabled margin="dense" label="uid" fullWidth defaultValue={userInfo.uid} />
            <TextField disabled margin="dense" label="이메일" fullWidth defaultValue={userInfo.email} />
            <TextField autoFocus required margin="dense" id="displayName"
              name="displayName" label="이름" type="text" fullWidth
              defaultValue={userInfo.displayName} onChange={handleChange}
            />
            <TextField required margin="dense" id="job"
              name="job" label="직업" type="text" fullWidth
              defaultValue={userInfo.job} onChange={handleChange}
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