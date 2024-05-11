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

import useUserInfo from './useUserInfo';
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import UserInfoUpdateDialog from './userInfo-update-dialog';

// ----------------------------------------------------------------------

export default function UserInfoTableRow({
  uid, selected, email, displayName, avatarUrl, job, role, status, // isVerified,
  registeredAt, handleClick,
}) {
  const [openPopover, setOpenPopover] = useState(null);
  const handleOpenMenu = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenPopover(null);
  };
  const { deleteRecord } = useUserInfo();
  const handleDeleteMenu = () => {
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
            <Typography variant="subtitle2" noWrap>
              {displayName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>
        <TableCell>{job}</TableCell>
        <TableCell>{role}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell>{registeredAt}</TableCell>

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
        <UserInfoUpdateDialog uid={uid} callback={handleCloseMenu} />

        <MenuItem onClick={handleDeleteMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          삭제
        </MenuItem>
      </Popover>
    </>
  );
}
