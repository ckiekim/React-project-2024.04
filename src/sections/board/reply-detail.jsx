import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function ReplyDetail({ reply, account }) {
  const [comment, setComment] = useState('');

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
              <Link href='#' onClick={}>
                <BorderColorIcon fontSize='small' sx={{ ml: 2 }} />
              </Link>&nbsp;
              <Link href='#' onClick={}>
                <DeleteIcon fontSize='small' />
              </Link>
            </>
          )}
        </Typography>
        <Typography>{reply.comment}</Typography>
      </Stack>
      {reply.isMine && 
        <Avatar src={reply.commenter.avatarUrl} alt={reply.commenter.displayName} />
      }
    </Stack>
  )
}