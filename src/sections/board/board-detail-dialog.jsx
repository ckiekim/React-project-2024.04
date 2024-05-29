import { useEffect, useState } from 'react';

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
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import MyEditor from '../../components/my-editor';
import useBoard from './useBoard';
import useReply from './useReply';
import { formatAgo, fDateTime } from '../../utils/format-time';

export default function BoardDetailDialog({ open, account, onClose, board }) {
  const [viewCount, setViewCount] = useState(board.viewCount);
  const [replyCount, setReplyCount] = useState(board.replyCount);
  const [comment, setComment] = useState('');

  const { updateRecord: updateBoardRecord } = useBoard();
  const handleClose = () => { 
    if (account.uid !== board.writer.uid) 
      updateBoardRecord.mutate({ ...board, viewCount });
    onClose(false); 
  };
  useEffect(() => {
    if (account.uid !== board.writer.uid)
      setViewCount(board.viewCount + 1);
  }, [board, account]);

  const { getList: { data: replies }, insertRecord: insertReplyRecord } = useReply(board.bid);
  const handleReply = () => {
    if (comment && comment.trim().length > 1) {
      setReplyCount(board.replyCount + 1);
      const reply = { bid: board.bid, comment, commenter: account,
        isMine: account.uid === board.writer.uid };
      insertReplyRecord.mutate(reply);
      updateBoardRecord.mutate({ ...board, replyCount: board.replyCount + 1 });
      setComment('');
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Enter 키로 인한 기본 submit 동작 방지
      handleReply();
    }
  };

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
                조회: {viewCount},&nbsp;&nbsp;댓글: {replyCount}
              </Typography>
            </Stack>
          </Stack>
          <MyEditor initialContent={board.content} mode='read' />

          {replies &&
            replies.map(reply => (
              <Stack direction='row' spacing={2} mt={2} key={reply.rid}
                justifyContent={reply.isMine ? 'flex-end' : 'flex-start'}
                textAlign={reply.isMine ? 'right' : 'left'}
                sx={{
                  alignItems: 'flex-start',
                  '& > *': { textAlign: reply.isMine ? 'right' : 'left' }
                }}
              >
                {!reply.isMine && 
                  <Avatar src={reply.commenter.avatarUrl} alt={reply.commenter.displayName} />
                }
                <Stack spacing={0.1}>
                  <Typography variant='body2'>
                    {reply.commenter.displayName}&nbsp;&nbsp;
                    {fDateTime(reply.writtenAt, 'yyyy-MM-dd HH:mm:ss')} ({formatAgo(reply.writtenAt, 'ko')})
                  </Typography>
                  <Typography>{reply.comment}</Typography>
                </Stack>
                {reply.isMine && 
                  <Avatar src={reply.commenter.avatarUrl} alt={reply.commenter.displayName} />
                }
              </Stack>
            ))
          }
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', width: '100%', my: 1 }}>
          <TextField margin="dense" id="comment" multiline
            name="comment" label="댓글" type="text" sx={{ width: '70%' }}
            value={comment} onChange={e => { setComment(e.target.value); }}
            onKeyDown={handleKeyDown}
          />
        </DialogActions>

      </Dialog>
    </>
  );
}