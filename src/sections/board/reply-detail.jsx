import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import useBoard from '../../hooks/useBoard';
import useReply from '../../hooks/useReply';
import { formatAgo, fDateTime } from '../../utils/format-time';

export default function ReplyDetail({ reply, account, board }) {
  const [comment, setComment] = useState('');
  const [editMode, setEditMode] = useState(false);

  const { updateRecord: updateBoardRecord } = useBoard();
  const { updateRecord: updateReplyRecord, deleteRecord: deleteReplyRecord } = useReply();
  const handleUpdate = () => {
    setComment(reply.comment);
    setEditMode(true);
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Enter 키로 인한 기본 submit 동작 방지
      updateReplyRecord.mutate({ ...reply, comment });
      setEditMode(false);
    }
  };
  const handleDelete = () => {
    deleteReplyRecord.mutate(reply.rid);
    updateBoardRecord.mutate({ ...board, replyCount: board.replyCount - 1 });
  }

  return (
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
          {account.uid === reply.commenter.uid && (
            <>
              <Link href='#' onClick={handleUpdate}>
                <BorderColorIcon fontSize='small' sx={{ ml: 2 }} />
              </Link>&nbsp;
              <Link href='#' onClick={handleDelete}>
                <DeleteIcon fontSize='small' />
              </Link>
            </>
          )}
        </Typography>
        {!editMode && <Typography>{reply.comment}</Typography>}
        {editMode && 
          <TextField margin="dense" id="comment" multiline
            value={comment} onChange={e => { setComment(e.target.value); }}
            onKeyDown={handleKeyDown} />
        }
      </Stack>
      {reply.isMine && 
        <Avatar src={reply.commenter.avatarUrl} alt={reply.commenter.displayName} />
      }
    </Stack>
  )
}