import React, { useState } from "react";
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
import useBlogs from './useBlogs';
import { uploadImage } from "../../api/cloudinary";

export default function PostInsertForm({ account }) {
  const { uid, displayName, avatarUrl } = account;
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [post, setPost] = useState({ author: {uid, displayName, avatarUrl}, title: '', });
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { 
    setOpen(false); 
    setPost({ author: {uid, displayName, avatarUrl}, title: '', });
    setFile();
  };
  const handleChange = e => {
    setPost({...post, [e.target.name]: e.target.value});
  }
  const handleUpload = newFile => {
    setFile(newFile);
    uploadImage(newFile)
      .then(url => setPost({...post, ['cover']: url}));
  }
  const { insertRecord } = useBlogs();
  const handleSubmit = e => {
    e.preventDefault();
    insertRecord.mutate(post);
    handleClose();
  }

  return (
    <>
      <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}>
        New Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>포스트 추가</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ width: '40ch' }} alignItems="center">
            {file && <img src={post.cover} alt='post' width='80%' />}
            <TextField disabled margin="dense" label="uid" fullWidth defaultValue={uid} />
            <TextField disabled margin="dense" label="이름" fullWidth defaultValue={displayName} />
            <TextField autoFocus required margin="dense" id="title"
              name="title" label="제목" type="text" fullWidth
              defaultValue={post.title} onChange={handleChange}
            />
            <MuiFileInput required margin="dense" id="photo"
              label='포스트 사진' value={file} name='file' fullWidth
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