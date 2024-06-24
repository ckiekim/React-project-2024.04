import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import Iconify from '../../components/iconify';
import { fCurrency } from '../../utils/format-number';
import useOrders from '../../hooks/useOrders';
// import useNotification from '../../hooks/useNotification';
import useCart from '../../hooks/useCart';
import CartItemGrid from './cart-item-grid';
import CartItemRow from './cart-item-row';
import DeliveryInfo from './delivery-info';

const DELIVERY_COST = 3000;
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

export default function CartWidget({ count }) {
  const [open, setOpen] = useState(false);
  const [itemCount, setItemCount] = useState(count);
  const [totalPrice, setTotalPrice] = useState(0);
  const [wholePrice, setWholePrice] = useState(0);
  const [items, setItems] = useState([]);
  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');
  const [tel, setTel] = useState('');
  const [memo, setMemo] = useState('선택 안 함');
  const [zoneCode, setZoneCode] = useState('');
  const uid = sessionStorage.getItem('sessionUid');
  const email = sessionStorage.getItem('sessionEmail');
  const isSmUp = useMediaQuery(theme => theme.breakpoints.up('sm'));

  const navigate = useNavigate();
  const { insertRecord: insertOrderRecord } = useOrders();
  // const { insertRecord: insertNotiRecord } = useNotification(email);
  const { cart, // refetchCart, 
    updateRecord: updateCartRecord, deleteRecord: deleteCartRecord } = useCart(uid);

  const handleOpen = () => { 
    if (count === 0)
      return;
    setItemCount(cart.itemCount);
    setTotalPrice(cart.totalPrice);
    setItems(cart.items);
    setWholePrice(cart.totalPrice + DELIVERY_COST);
    setOpen(true); 
  };
  const handleClose = () => { setOpen(false); };

  const updateCart = (ic, tp, is) => {
    const newCart = { id: uid, itemCount: ic, totalPrice: tp, items: is };
    updateCartRecord.mutate(newCart);
  }

  const handleOrder = () => {
    const deliveryInfo = { zoneCode, addr1, addr2, tel, memo };
    if (!(addr1 && tel))
      return;
    const order = { uid, email, totalPrice, itemCount, items, deliveryInfo, wholePrice };
    try {
      insertOrderRecord.mutate(order, {
        onSuccess: oid => {
          navigate('/toss/checkout', {
            state: { order: { ...order, oid } }
          });
        }
      });
      deleteCartRecord.mutate(uid);
      // insertNotiRecord.mutate({ email, type: '주문', description: '주문이 완료되었습니다.' });
      setZoneCode(''); setAddr1(''); setAddr2(''); setTel(''); setMemo('선택 안 함');
      setOpen(false);
    } catch (error) {
      console.error('Error processing order:', error);
    }
  }

  const handleMinus = (index) => {
    if (items[index].quantity === 1)
      return;
    const { unitPrice, quantity, subTotal } = items[index];
    const row = {...items[index], quantity: quantity - 1, subTotal: unitPrice * (quantity - 1)};
    const newItems = items.toSpliced(index, 1, row);
    const newPrice = totalPrice - subTotal + unitPrice * (quantity - 1);
    setItems(newItems);
    setTotalPrice(newPrice);
    setWholePrice(newPrice + DELIVERY_COST);
    updateCart(itemCount, newPrice, newItems);
  }

  const handlePlus = (index) => {
    const { unitPrice, quantity, subTotal } = items[index];
    const row = {...items[index], quantity: quantity + 1, subTotal: unitPrice * (quantity + 1)};
    // console.log(row);
    const newItems = items.toSpliced(index, 1, row);
    const newPrice = totalPrice - subTotal + unitPrice * (quantity + 1);
    setItems(newItems);
    setTotalPrice(newPrice);
    setWholePrice(newPrice + DELIVERY_COST);
    updateCart(itemCount, newPrice, newItems);
  }

  const handleDelete = (index) => {
    const { subTotal } = items[index];
    const newItems = items.filter((_, idx) => (idx !== index));
    const newPrice = totalPrice - subTotal;
    setItems(newItems);
    setTotalPrice(newPrice);
    setWholePrice(newPrice + DELIVERY_COST);
    setItemCount(newItems.length);
    if (itemCount <= 1) {
      setOpen(false);
      deleteCartRecord.mutate(uid);
    } else {
      updateCart(newItems.length, newPrice, newItems);
    }
  }
  
  return (
    <>
      <StyledRoot>
        <Badge showZero badgeContent={count} color="error" max={99} onClick={handleOpen}>
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
        </Badge>
      </StyledRoot>

      <Dialog open={open} onClose={handleClose} maxWidth='lg'>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>Shopping Cart</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {items && isSmUp &&
            <>
              <Table size={itemCount > 3 ? 'small' : ''}>
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
                    <CartItemRow
                      key={item.id}
                      item={item}
                      index={index}
                      handleMinus={handleMinus}
                      handlePlus={handlePlus}
                      handleDelete={handleDelete}
                    />
                  ))}
                </TableBody>
              </Table>

              {totalPrice && 
                <Stack direction='row' spacing={2} alignItems='center' mt={2}>
                  <TextField label='상품가격' value={fCurrency(totalPrice)}
                    InputProps={{ readOnly: true, inputProps: { style: { textAlign: 'right' } } }} />
                  <Typography variant='h5'>&#43;</Typography>
                  <TextField label='배송비' value={fCurrency(DELIVERY_COST)} 
                    InputProps={{ readOnly: true, inputProps: { style: { textAlign: 'right' } } }} />
                  <Typography variant='h5'>&#61;</Typography>
                  <Typography variant='h5' textAlign='right' sx={{mt: 2, px: 2}}>총계: &#8361; {fCurrency(wholePrice)}</Typography>
                </Stack>
              }
            </>
          }

          {items && !isSmUp &&
            <>
              <Typography variant='h5' mb={1}>상품목록</Typography>
              <Grid container alignItems='center'>
                {items.map((item, index) => (
                  <CartItemGrid
                    key={item.id}
                    item={item}
                    index={index}
                    handleMinus={handleMinus}
                    handlePlus={handlePlus}
                    handleDelete={handleDelete}
                  />
                ))}
              </Grid>
              {totalPrice && 
                <Grid container spacing={2} alignItems='center' my={1}>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={8}>
                    <TextField label='상품가격' value={fCurrency(totalPrice)} size='small' fullWidth
                      InputProps={{ readOnly: true, inputProps: { style: { textAlign: 'right' } } }} />
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    <Typography variant='h6'>&#43;</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField label='배송비' value={fCurrency(DELIVERY_COST)} size='small' fullWidth
                      InputProps={{ readOnly: true, inputProps: { style: { textAlign: 'right' } } }} />
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    <Typography variant='h6'>&#61;</Typography>
                  </Grid>
                  <Grid item xs={8} sx={{ textAlign: 'right' }}>
                    <Typography variant='h6'>총계: &#8361; {fCurrency(wholePrice)}</Typography>
                  </Grid>
                </Grid>
              }
            </>
          }
          
          <Divider sx={{ my: 2 }} />

          <DeliveryInfo 
            zoneCode={zoneCode} addr1={addr1} addr2={addr2} 
            tel={tel} memo={memo} setZoneCode={setZoneCode} setAddr1={setAddr1} 
            setAddr2={setAddr2} setTel={setTel} setMemo={setMemo} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOrder} variant="contained">주문하기</Button>
          <Button onClick={handleClose} variant="outlined">복귀</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
