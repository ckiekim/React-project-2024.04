import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Iconify from '../../components/iconify';
import useMesssage from '../../hooks/useMessage';
import useUserInfo from '../../hooks/useUserInfo';
import useNotification from '../../hooks/useNotification';

export default function MessageInsertDialog() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({dstEmail: '', content: ''});

  const sessionEmail = sessionStorage.getItem('sessionEmail');
  const { getList: {data: userInfo} } = useUserInfo();
  const { insertRecord } = useMesssage();
  const { insertRecord: insertNotiRecord } = useNotification();
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { 
    setOpen(false); 
    setMessage({dstEmail: '', content: ''});
  };
  const handleChange = e => { setMessage({...message, [e.target.name]: e.target.value}); };
  const handleSubmit = () => {
    // console.log(sessionEmail);
    const dstUser = userInfo.filter(user => user.email === message.dstEmail)[0];
    const srcUser = userInfo.filter(user => user.email === sessionEmail)[0];
    const newMessage = { 
      content: message.content, 
      srcEmail: srcUser.email, srcName: srcUser.displayName, srcAvatar: srcUser.avatarUrl,
      dstEmail: dstUser.email, dstName: dstUser.displayName, dstAvatar: dstUser.avatarUrl,
    };
    // console.log(newMessage);
    insertRecord.mutate(newMessage);
    const notification = { email: dstUser.email, type: '메세지', description: '신규 메세지가 있습니다.' };
    insertNotiRecord.mutate(notification);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}>
        New Message
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>신규 메세지</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ width: '40ch' }} alignItems="center">
            <FormControl fullWidth>
              <InputLabel id="dstEmail">수신</InputLabel>
              <Select required margin="dense" name='dstEmail' label="수신자" id='dstEmail' 
                defaultValue={message.dstEmail} onChange={handleChange}>
                {userInfo && userInfo.map((user) => 
                  <MenuItem value={user.email} key={user.uid} alignItems='center'>
                    <Stack spacing={2} direction='row' alignItems='center'>
                      <Avatar alt={user.displayName} src={user.avatarUrl} /> 
                      <Typography>{user.displayName}</Typography>
                    </Stack>
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            <TextField required margin="dense" id="content" multiline
              name="content" label="메세지" type="text" fullWidth
              defaultValue={message.content} onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">등록</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}