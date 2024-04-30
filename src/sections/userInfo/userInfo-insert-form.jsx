import React, { Fragment, useState } from "react";
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
import useUserInfo from "./useUserInfo";
import { uploadImage } from "../../api/cloudinary";

export default function UserInfoInsertForm({uid, email}) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [userInfo, setUserInfo] = useState({uid, email, displayName:'', job:''});
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { 
    setOpen(false); 
    setUserInfo({uid, email, displayName:'', job:''});
    setFile();
  };
  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  const handleUpload = newFile => {
    setFile(newFile);
    uploadImage(newFile)
      .then(url => setUserInfo({...userInfo, ['avatarUrl']: url}));
  }
  const { insertRecord } = useUserInfo();
  const handleSubmit = e => {
    e.preventDefault();
    insertRecord.mutate(userInfo);
    setOpen(false);
    setUserInfo({uid:'', email:'', displayName:'', job:''});
    setFile();
  }

  return (
    <Fragment>
      <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}>
        UserInfo
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>사용자 정보 등록</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ width: '40ch' }} alignItems="center">
            {file && <img src={userInfo.avatarUrl} alt='photo' width='80%' />}
            <TextField disabled margin="dense" label="uid" fullWidth defaultValue={uid} />
            <TextField disabled margin="dense" label="이메일" fullWidth defaultValue={email} />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">등록</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}