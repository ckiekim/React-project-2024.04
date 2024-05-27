import { useEffect, useState } from 'react';

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

export default function BoardDetailDialog({ open, onClose, board }) {
  const [title, setTitle] = useState(board.title);
  const [viewCount, setViewCount] = useState(board.viewCount);
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    const initialContent = {
      blocks: board.content.blocks,
      entityMap: {}
    }
    setEditorContent(initialContent);
  }, [])

  const { updateRecord } = useBoard();
  const handleClose = () => { 
    onClose(false); 
  };
  const handleSubmit = () => {
    const newBoard = { ...board, title, content: editorContent, viewCount };
    updateRecord.mutate(board);
    handleClose();
  }
  const handleEditorContentChange = (content) => {
    setEditorContent(content);
  };

  const uid = sessionStorage.getItem('sessionUid');
  useEffect(() => {
    if (uid !== board.writer.uid)
      setViewCount(board.viewCount + 1);
  }, [uid]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth='lg'>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>게시글 읽기</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Typography variant='h6'>{board.title}</Typography>
            <MyEditor 
              initialContent={editorContent}
              onContentChange={handleEditorContentChange} 
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">확인</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}