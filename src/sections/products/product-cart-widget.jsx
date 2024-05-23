import { useEffect, useState } from 'react';
import DaumAddressDialog from '../../components/daum-address-dialog';

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
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Iconify from '../../components/iconify';
import { fCurrency } from '../../utils/format-number';
import useOrders from '../orders/useOrders';
import useNotification from '../notification/useNotification';
import useCart from './useCart';

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export default function CartWidget({ count }) {
  const [open, setOpen] = useState(false);
  const [itemCount, setItemCount] = useState(count);
  const [totalPrice, setTotalPrice] = useState(0);
  const [wholePrice, setWholePrice] = useState(0);
  const [items, setItems] = useState([]);
  const { insertRecord: insertOrderRecord } = useOrders();
  const uid = sessionStorage.getItem('sessionUid');
  const email = sessionStorage.getItem('sessionEmail');
  const { insertRecord: insertNotiRecord } = useNotification(email);
  const { cart, // refetchCart,
    updateRecord: updateCartRecord, deleteRecord: deleteCartRecord } = useCart(uid);

  const handleClickOpen = () => { 
    if (count === 0)
      return;
    setItemCount(cart.itemCount);
    setTotalPrice(cart.totalPrice);
    setItems(cart.items);
    setWholePrice(cart.totalPrice + DELIVERY_COST);
    setOpen(true); 
  };

  const updateCart = (ic, tp, is) => {
    const newCart = { id: uid, itemCount: ic, totalPrice: tp, items: is };
    updateCartRecord.mutate(newCart);
  }

  const handleClose = () => { setOpen(false); };

  const handleOrder = () => {
    const deliveryInfo = { zoneCode, addr1, addr2, tel, memo };
    // console.log(deliveryInfo);
    const order = { uid, email, totalPrice, itemCount, items, deliveryInfo, wholePrice };
    // console.log(order);
    insertOrderRecord.mutate(order);
    deleteCartRecord.mutate(uid);
    insertNotiRecord.mutate({ email, type: '주문', description: '주문이 완료되었습니다.' });
    setZoneCode(''); setAddr1(''); setAddr2(''); setTel(''); setMemo('선택 안 함');
    setOpen(false);
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
      // refetchCart();
    } else {
      updateCart(newItems.length, newPrice, newItems);
    }
  }

  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');
  const [tel, setTel] = useState('');
  const [memo, setMemo] = useState('선택 안 함');
  const [zoneCode, setZoneCode] = useState('');
  const deliveryMemos = ['선택 안 함', '문앞에 놓아주세요', '부재시 연락 부탁드려요',
    '배송 전 미리 연락해 주세요', '부재시 1층 택배 보관장소에 맡겨주세요'];

  const handleComplete = data => {
    setZoneCode(data.zonecode);
    setAddr1(data.address);
  }
  const handlePress = e => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) 
      setTel(e.target.value);
  }
  useEffect(() => {
    if (tel.length === 10)
      setTel(tel.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    if (tel.length === 13)
      setTel(tel.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
  }, [tel]);

  return (
    <>
      <StyledRoot>
        <Badge showZero badgeContent={count} color="error" max={99} onClick={handleClickOpen}>
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
          {items && <Table size={itemCount > 3 ? 'small' : ''}>
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
          
          <Divider sx={{ my: 2}} />
          
          <Typography variant='h5'>배송정보</Typography>
          <Stack alignItems='center' spacing={0.1}>
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs={6}>
                <TextField value={zoneCode} label="우편번호" variant="standard" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <DaumAddressDialog handler={handleComplete} />
              </Grid>
            </Grid>
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs={12}>
                <TextField margin="dense" value={addr1} label="기본주소" variant="standard" fullWidth />
              </Grid>
            </Grid>
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs={6}>
                <TextField required margin="dense" defaultValue={addr2} label="상세주소" fullWidth 
                  onChange={e => setAddr2(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField required margin="dense" value={tel} label="전화번호" fullWidth
                  onChange={handlePress} placeholder='숫자만 입력하세요' />
              </Grid>
            </Grid>
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="memo">배송메모</InputLabel>
                  <Select required margin="dense" name='memo' label="배송메모" id='memo'
                    value={memo} onChange={e => setMemo(e.target.value)}>
                    {deliveryMemos.map((delMemo) =>
                      <MenuItem value={delMemo} key={'e'+delMemo}>
                        {delMemo}
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOrder} variant="contained">주문하기</Button>
          <Button onClick={handleClose} variant="outlined">복귀</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
