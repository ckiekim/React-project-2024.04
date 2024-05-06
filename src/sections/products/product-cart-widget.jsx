import { useState } from 'react';

import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import Iconify from '../../components/iconify';
import { fCurrency } from '../../utils/format-number';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget({ count, handleCount }) {
  const [open, setOpen] = useState(false);
  const [itemCount, setItemCount] = useState(count);
  const [totalPrice, setTotalPrice] = useState(0);
  const [items, setItems] = useState([]);

  const handleClickOpen = () => { 
    if (count === 0)
      return;
    const sessionCart = sessionStorage.getItem('sessionCart');
    if (sessionCart) {
      const cart = JSON.parse(sessionCart);
      console.log(cart);
      setItemCount(cart.count);
      setTotalPrice(cart.totalPrice);
      setItems(cart.items);
    } else {
      setItemCount(0);
    }
    setOpen(true); 
  };
  const updateSession = () => {
    const cart = {count: itemCount, totalPrice, items};
    console.log(cart);
    sessionStorage.setItem('sessionCart', JSON.stringify(cart));
    handleCount(itemCount);
  }
  const handleClose = () => { 
    setOpen(false); updateSession(); 
  };
  const handleOrder = () => {
    handleClose();
  }
  const handleMinus = (index) => {
    if (items[index].quantity === 1)
      return;
    const { unitPrice, quantity, subTotal } = items[index];
    const row = {...items[index], quantity: quantity - 1, subTotal: unitPrice * (quantity - 1)};
    setItems(items.toSpliced(index, 1, row));
    setTotalPrice(totalPrice - subTotal + unitPrice * (quantity - 1));
    updateSession();
  }
  const handlePlus = (index) => {
    const { unitPrice, quantity, subTotal } = items[index];
    const row = {...items[index], quantity: quantity + 1, subTotal: unitPrice * (quantity + 1)};
    // console.log(row);
    setItems(items.toSpliced(index, 1, row));
    setTotalPrice(totalPrice - subTotal + unitPrice * (quantity + 1));
    updateSession();
  }
  const handleDelete = (index) => {
    const { subTotal } = items[index];
    setItems(items.filter((_, idx) => (idx !== index)));
    setTotalPrice(totalPrice - subTotal);
    setItemCount(prev => (prev - 1));
    updateSession();
    if (itemCount <= 1) {
      setOpen(false);
      handleCount(0);
      sessionStorage.removeItem('sessionCart');
    }
  }

  return (
    <>
      <StyledRoot>
        <Badge showZero badgeContent={count} color="error" max={99} onClick={handleClickOpen}>
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
        </Badge>
      </StyledRoot>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>Shopping Cart</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {items && <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">상품</TableCell>
                <TableCell align="center"> </TableCell>
                <TableCell align="center">단가</TableCell>
                <TableCell align="center">수량</TableCell>
                <TableCell align="center">소계</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell align="left">
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Avatar alt={item.pname} src={item.cover} />
                      <Typography>{item.pname}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ width: 16, height: 16, bgcolor: item.option, borderRadius: '50%', border: 'solid 2px' }} />
                  </TableCell>
                  <TableCell align="right">
                    <Typography>{fCurrency(item.unitPrice)}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction='row' spacing={0.1} alignItems='center'>
                      <IconButton aria-label="minus" onClick={() => handleMinus(index)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton aria-label="plus" onClick={() => handlePlus(index)}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>{fCurrency(item.subTotal)}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>}
          {totalPrice && 
            <Typography variant='h5' textAlign='right' sx={{mt: 2, px: 2}}>총계: &#8361; {fCurrency(totalPrice)}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOrder} variant="contained">주문하기</Button>
          <Button onClick={handleClose} variant="outlined">복귀</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
