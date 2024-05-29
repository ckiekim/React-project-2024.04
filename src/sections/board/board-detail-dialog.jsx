import { useEffect, useState, useCallback } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'

import MyEditor from '../../components/my-editor';
import useBoard from './useBoard';
import { formatAgo, fDateTime } from '../../utils/format-time';

export default function BoardDetailDialog({ open, onClose, board }) {
  const uid = sessionStorage.getItem('sessionUid');
  const [viewCount, setViewCount] = useState(board.viewCount);

  const { updateRecord } = useBoard();
  const memoizedUpdateRecord = useCallback(updateRecord, []);
  const handleClose = () => { 
    if (uid !== board.writer.uid) 
      memoizedUpdateRecord.mutate({ ...board, viewCount });
    onClose(false); 
  };

  useEffect(() => {
    if (uid !== board.writer.uid)
      setViewCount(board.viewCount + 1);
  }, [board, uid]);

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
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Stack spacing={0.3}>
              <Typography variant='h5'>{board.title}</Typography>
              <Typography variant='subtitle2'>{board.bid}</Typography>
              <Typography variant='subtitle2'>
                {fDateTime(board.modifiedAt, 'yyyy-MM-dd HH:mm:ss')} ({formatAgo(board.modifiedAt, 'ko')})
              </Typography>
            </Stack>
            <Stack alignItems="flex-end" textAlign="right" spacing={0.1}>
              <Stack direction='row' spacing={1} alignItems='center'>
                <Avatar src={board.writer.avatarUrl} alt={board.writer.displayName}
                  sx={{ width: 36, height: 36 }} />
                <Typography variant="h6">{board.writer.displayName}</Typography>
              </Stack>
              <Stack direction='row' spacing={1} alignItems='center'>
                <FavoriteBorderIcon />
                <Typography variant='subtitle2'>
                  {board.likeCount}
                </Typography>
              </Stack>
              <Typography variant='subtitle2'>
                조회: {viewCount},&nbsp;&nbsp;댓글: {board.replyCount}
              </Typography>
            </Stack>
          </Stack>
          <MyEditor initialContent={board.content} mode='read' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">확인</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}