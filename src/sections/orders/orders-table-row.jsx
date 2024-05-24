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

import useOrders from './useOrders';
import Iconify from '../../components/iconify';
import { formatAgo } from '../../utils/format-time';
import { fCurrency } from '../../utils/format-number';

export default function OrdersTableRow({ order, selected, handleClick }) {
  const [openPopover, setOpenPopover] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { updateRecord } = useOrders();
  const orderItem = order.itemCount >= 2 ?
    `${order.items[0].pname} 外 ${order.itemCount - 1} 종` : order.items[0].pname;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
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
        <TableCell>
          <Typography variant="body2">{order.email}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">{formatAgo(order.orderedAt, 'ko')}</Typography>
        </TableCell>
        <TableCell>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Avatar src={order.items[0].cover} alt={order.items[0].pname} />
            <Typography variant="body2">{orderItem}</Typography>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body2">{fCurrency(order.wholePrice)}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2"
            aria-owns={!!anchorEl ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            {order.deliveryInfo.addr1}
          </Typography>
          <Popover id="mouse-over-popover" sx={{ pointerEvents: 'none', }}
            open={!!anchorEl} anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
            transformOrigin={{ vertical: 'top', horizontal: 'left', }}
            onClose={handlePopoverClose} disableRestoreFocus
          >
            <Typography sx={{ p: 1 }} variant="body2">{order.deliveryInfo.zoneCode}</Typography>
            <Typography sx={{ p: 1 }} variant="body2">{order.deliveryInfo.addr1}</Typography>
            <Typography sx={{ p: 1 }} variant="body2">{order.deliveryInfo.addr2}</Typography>
            <Typography sx={{ p: 1 }} variant="body2">{order.deliveryInfo.tel}</Typography>
            <Typography sx={{ p: 1 }} variant="body2">{order.deliveryInfo.memo}</Typography>
          </Popover>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">{order.status}</Typography>
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