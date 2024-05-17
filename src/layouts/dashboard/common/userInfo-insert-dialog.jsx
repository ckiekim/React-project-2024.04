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

import useUserInfo from '../../../sections/userInfo/useUserInfo';
import useNotification from '../../../sections/notification/useNotification';
import { squareImage } from '../../../api/cloudinary';

export default function UserInfoInsertDialog({ callback }) {
  const email = sessionStorage.getItem('sessionEmail');
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState();
  const [userInfo, setUserInfo] = useState({ displayName:'', job:'' });
  
  const handleClick = () => { setOpenDialog(true); }
  const handleClose = () => { 
    setOpenDialog(false);
    setUserInfo({ displayName:'', job:'' });
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
  const { insertRecord } = useUserInfo();
  const { insertRecord: insertNotiRecord } = useNotification(email);
  const handleSubmit = e => {
    insertRecord.mutate(userInfo);
    // console.log(userInfo);
    callback(null);
    handleClose();
    insertNotiRecord.mutate({ email, 
      type: '사용자', description: 'CK World에 오신 것을 환영합니다.'});
    insertNotiRecord.mutate({ email: process.env.REACT_APP_ADMIN_USER,
      type: '사용자', description: `신규회원(${email})이 가입했습니다.`
    });
  }
  
  useEffect(() => {
    setUserInfo({...userInfo, uid: sessionStorage.getItem('sessionUid'), 
      email: sessionStorage.getItem('sessionEmail')});
    // console.log(sessionStorage.getItem('sessionUid'), sessionStorage.getItem('sessionEmail'));
  }, []);

  return (
    <>
      <MenuItem key='Settings' onClick={handleClick}>
        Settings
      </MenuItem>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>사용자 정보 등록</Typography>
        </DialogTitle>
        <IconButton aria-label='close' onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ width: '40ch' }} alignItems="center">
            {file && <img src={userInfo.avatarUrl} alt='photo' width='80%' />}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">등록</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}