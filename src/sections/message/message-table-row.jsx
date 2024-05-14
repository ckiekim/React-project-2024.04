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

import Label from '../../components/label';
import Iconify from '../../components/iconify';
import { formatAgo } from '../../utils/format-time';

export default function MessageTableRow({ message, selected, handleClick }) {
  const { mid, content, status, srcEmail, srcName, srcAvatar, dstEmail, dstName, dstAvatar,
    sentAt } = message;
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenMenu = (event) => { setOpenPopover(event.currentTarget); };
  const handleCloseMenu = () => { setOpenPopover(null); };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} key={mid}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={srcName} src={srcAvatar} />
            <Typography variant="subtitle2" noWrap>
              {srcName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{content}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell>{formatAgo(sentAt, 'ko')}</TableCell>

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
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          삭제
        </MenuItem>
      </Popover>
    </>
  );
}