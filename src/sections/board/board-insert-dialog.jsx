import { useState } from 'react';
import { convertToRaw } from 'draft-js';

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'

import Iconify from '../../components/iconify';
import MyEditor from '../../components/my-editor';
import useBoard from './useBoard';

export default function BoardInsertDialog({ account }) {
  const { uid, displayName, avatarUrl } = account;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');

  const { insertRecord } = useBoard();
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { 
    setTitle('');
    setOpen(false); 
  };
  const handleSubmit = () => {
    console.log(editorContent);
    // const content = convertToRaw(editorContent.getCurrentContent()); // Convert editor content to raw JSON format
    const board = { title, content: editorContent, 
      writer: { uid, displayName, avatarUrl }
    }
    insertRecord.mutate(board);
    handleClose();
  }
  const handleEditorContentChange = (content) => {
    setEditorContent(content);
  };

  return (
    <>
      <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}>
        글 쓰기
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth='lg'>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>게시글 쓰기</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField autoFocus required margin="dense" id="title"
              name="title" label="제목" type="text" fullWidth
              defaultValue={title} onChange={e => setTitle(e.target.value)}
            />
            <MyEditor onContentChange={handleEditorContentChange} mode='write' />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">제출</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}