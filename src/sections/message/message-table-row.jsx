import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import MessageReplyDialog from './message-reply-dialog';
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import { formatAgo } from '../../utils/format-time';
import useMessage from './useMessage';

export default function MessageTableRow({ message, selected, handleClick }) {
  const { mid, status, srcName, srcAvatar, // content, srcEmail, dstEmail, dstName, dstAvatar,
    sentAt } = message;
  const [openPopover, setOpenPopover] = useState(null);
  const { updateRecord, deleteRecord } = useMessage();

  const handleOpenMenu = (event) => { setOpenPopover(event.currentTarget); };
  const handleCloseMenu = () => { setOpenPopover(null); };
  const handleUpdateStatus = () => {
    const newMessage = {...message, status: '읽음'};
    updateRecord.mutate(newMessage);
    handleCloseMenu();
  };
  const handleDeleteMenu = () => {
    deleteRecord.mutate(mid);
    handleCloseMenu();
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} key={mid}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={srcName} src={srcAvatar} />
            <Typography variant="body2" noWrap>{srcName}</Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Typography variant="body2"><MessageReplyDialog message={message} /></Typography>
        </TableCell>

        <TableCell>
          <Label color={(status === '읽음') ? 'primary' : (status === '신규') ? 'error' : 'success'}>
            {status}
          </Label>
        </TableCell>

        <TableCell>
          <Typography variant="body2">{formatAgo(sentAt, 'ko')}</Typography>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover} anchorEl={openPopover} onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ width: 140 }}
      >
        <MenuItem onClick={handleUpdateStatus}>
          <Iconify icon="ic:outline-mark-chat-read" sx={{ mr: 2 }} />
          읽음
        </MenuItem>
        <MenuItem onClick={handleDeleteMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          삭제
        </MenuItem>
      </Popover>
    </>
  );
}