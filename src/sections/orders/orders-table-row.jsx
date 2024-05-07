import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

import useOrders from "./useOrders";
import Scrollbar from '../../components/scrollbar';
import Iconify from '../../components/iconify';
import { formatAgo } from '../../utils/format-time';
import { fCurrency } from '../../utils/format-number';

export default function OrdersTableRow({
  oid, selected, email, status, orderedAt, totalPrice, itemCount, items, handleClick
}) {
  const [openPopover, setOpenPopover] = useState(null);
  const handleOpenMenu = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} key={oid}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>{email}</TableCell>
        <TableCell align="center">{orderedAt}</TableCell>
        <TableCell>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Avatar src={items[0].cover} alt={items[0].pname} />
            <Typography>
              {items[0].pname} 外 {itemCount - 1} 종
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="right">{fCurrency(totalPrice)}</TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}