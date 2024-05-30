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

import useUserInfo from '../../hooks/useUserInfo';
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import UserInfoUpdateDialog from './userInfo-update-dialog';
import { formatAgo } from '../../utils/format-time';

// ----------------------------------------------------------------------

export default function UserInfoTableRow({ user, selected,  handleClick }) {
  const { uid, email, displayName, avatarUrl, job, role, status, registeredAt } = user;
  const [openPopover, setOpenPopover] = useState(null);
  const handleOpenMenu = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenPopover(null);
  };
  const { deleteRecord } = useUserInfo();
  const handleDeleteMenu = () => {
    const sessionUid = sessionStorage.getItem('sessionUid');
    if (sessionUid === uid)
      deleteRecord.mutate(uid);
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} key={uid}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={displayName} src={avatarUrl} />
            <Typography variant="body2" noWrap>
              {displayName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Typography variant="body2">{email}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{job}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{role}</Typography>
        </TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell>
          <Typography variant="body2">{formatAgo(registeredAt, 'ko')}</Typography>
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
        <UserInfoUpdateDialog user={user} callback={handleCloseMenu} />

        <MenuItem onClick={handleDeleteMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          삭제
        </MenuItem>
      </Popover>
    </>
  );
}
