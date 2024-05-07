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

import useOrders from "./useOrders";
import Iconify from '../../components/iconify';
import { formatAgo } from '../../utils/format-time';
import { fCurrency } from '../../utils/format-number';

export default function OrdersTableRow({ order, selected, handleClick }) {
  const [openPopover, setOpenPopover] = useState(null);
  const { updateRecord } = useOrders();

  const handleOpenMenu = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenPopover(null);
  };
  const handleStatusMenu = (status) => {
    updateRecord.mutate({...order, status});
    setOpenPopover(null);
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} key={order.oid}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>{order.email}</TableCell>
        <TableCell align="center">{formatAgo(order.orderedAt, 'ko')}</TableCell>
        <TableCell>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Avatar src={order.items[0].cover} alt={order.items[0].pname} />
            <Typography>
              {order.items[0].pname} 外 {order.itemCount - 1} 종
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="right">{fCurrency(order.totalPrice)}</TableCell>
        <TableCell align="center">{order.status}</TableCell>
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
        <MenuItem key='1' onClick={() => handleStatusMenu('배송중')} sx={{ color: 'error.main' }}>
          <Iconify icon="iconamoon:delivery" sx={{ mr: 2 }} />
          배송중
        </MenuItem>
        <MenuItem key='2' onClick={() => handleStatusMenu('배송완료')} sx={{ color: 'error.main' }}>
          <Iconify icon="tdesign:undertake-delivery" sx={{ mr: 2 }} />
          배송완료
        </MenuItem>
      </Popover>
    </>
  );
}