import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import BoardDetailDialog from './board-detail-dialog';
import useBoard from './useBoard';
import Iconify from '../../components/iconify';
import { formatAgo } from '../../utils/format-time';
import { fCurrency } from '../../utils/format-number';

export default function BoardTableRow({ board, selected, handleClick }) {
  const [openPopover, setOpenPopover] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { updateRecord } = useBoard();

  const handleOpenMenu = (event) => { setOpenPopover(event.currentTarget); };
  const handleCloseMenu = () => { setOpenPopover(null); };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} key={board.bid}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>
          <Link href='#'
            sx={{ color: 'inherit', textDecoration: 'none',
              '&:hover': { cursor: 'pointer', textDecoration: 'underline', },
            }} 
            onClick={() => {setOpenDialog(true)}}
          >
            <Stack spacing={1} direction='row'>
              <Typography variant="body2">{board.title}</Typography>
              <Typography variant="body2" color='error'>
                {board.replyCount > 0 ? `[${board.replyCount}]` : ''}
              </Typography>
            </Stack>
          </Link>
        </TableCell>
        <TableCell>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Avatar src={board.writer.avatarUrl} alt={board.writer.displayName} />
            <Typography variant="body2">{board.writer.displayName}</Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">{formatAgo(board.modifiedAt, 'ko')}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body2">{fCurrency(board.viewCount)}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body2">{fCurrency(board.likeCount)}</Typography>
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
        sx={{ width: 160 }}
      >
        <MenuItem key='1' sx={{ color: 'error.main' }}>
          <Iconify icon="iconamoon:delivery" sx={{ mr: 2 }} />
          수정
        </MenuItem>
        <MenuItem key='2' sx={{ color: 'error.main' }}>
          <Iconify icon="tdesign:undertake-delivery" sx={{ mr: 2 }} />
          삭제
        </MenuItem>
      </Popover>

      <BoardDetailDialog open={openDialog} onClose={setOpenDialog} board={board} />
    </>
  );
}