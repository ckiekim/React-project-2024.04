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
import useBlogs from './useBlogs';
import { uploadImage } from "../../api/cloudinary";

export default function UserInsertForm() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [blog, setBlog] = useState({title: '', });
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { 
    setOpen(false); 
    setBlog({title: '', })
    setFile();
  };
  const handleChange = e => {
    setBlog({...blog, [e.target.name]: e.target.value});
  }
  const handleUpload = newFile => {
    setFile(newFile);
    uploadImage(newFile)
      .then(url => setBlog({...blog, ['cover']: url}));
  }
  const { insertRecord } = useBlogs();
  const handleSubmit = e => {
    e.preventDefault();
    insertRecord.mutate(blog);
    setOpen(false);
    setUserInfo({title: '', });
    setFile();
  }

  return (
    <Fragment>
      <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}
       onClick={handleClickOpen}>
        New Blog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>블로그 등록</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ width: '40ch' }} alignItems="center">
            {file && <img src={blog.cover} alt='photo' width='80%' />}
            <TextField autoFocus required margin="dense" id="title"
              name="title" label="제목" type="text" fullWidth
              defaultValue={blog.title} onChange={handleChange}
            />
            <MuiFileInput required margin="dense" id="photo"
              label='블로그 사진' value={file} name='file' fullWidth
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