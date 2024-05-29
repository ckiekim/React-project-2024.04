import { useState } from 'react';

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
import Typography from '@mui/material/Typography'

import Iconify from '../../components/iconify';
import MyEditor from '../../components/my-editor';
import useBoard from './useBoard';

export default function BoardUpdateDialog({ board, account, onClose }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [editorContent, setEditorContent] = useState(board.content);

  const { updateRecord } = useBoard();

  const handleOpen = () => {
    if (account.uid !== board.writer.uid) {
      onClose();
      return null;
    } else 
      setOpen(true);
  }
  const handleClose = () => { setOpen(false); };
  const handleUpdate = () => {
    setOpen(false);
    const newBoard = { ...board, title, content: editorContent, modifiedAt: new Date().toISOString() };
    console.log(newBoard);
    updateRecord.mutate(newBoard);
    onClose();
  }
  const handleEditorContentChange = (content) => {
    setEditorContent(content);
  };

  return (
    <>
      <MenuItem key='1' sx={{ color: 'primary.main' }} onClick={handleOpen}>
        <Iconify icon="solar:pen-2-bold" sx={{ mr: 2 }} />
        수정
      </MenuItem>
      <Dialog open={open} onClose={handleClose} maxWidth='lg'>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>게시글 수정</Typography>
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
            <MyEditor 
              initialContent={editorContent}
              onContentChange={handleEditorContentChange} 
              mode='update' 
            />
          </Stack>          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} variant="contained">수정</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}