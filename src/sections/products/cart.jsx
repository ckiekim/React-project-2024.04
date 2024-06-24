import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
import useMediaQuery from '@mui/material/useMediaQuery';
import Iconify from '../../components/iconify';
import { fCurrency } from '../../utils/format-number';
import useOrders from '../../hooks/useOrders';
import useCart from '../../hooks/useCart';
import PhoneNumberInput from '../../components/phone-number-input';

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

const CartItemRow = ({ item, index, handleMinus, handlePlus, handleDelete }) => (
  <TableRow key={item.id}>
    <TableCell align="left">
      <Stack direction='row' spacing={2} alignItems='center'>
        <Avatar alt={item.pname} src={item.cover.startsWith('/') ? `${process.env.PUBLIC_URL}${item.cover}` : item.cover} />
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
);

const CartItemGrid = ({ item, index, handleMinus, handlePlus, handleDelete }) => (
  <>
    <Grid item xs={8}>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Avatar alt={item.pname} src={item.cover.startsWith('/') ? `${process.env.PUBLIC_URL}${item.cover}` : item.cover} />
        <Typography>{item.pname}</Typography>
      </Stack>
    </Grid>
    <Grid item xs={1}>
      <Box sx={{ width: 16, height: 16, bgcolor: item.option, borderRadius: '50%', border: 'solid 2px' }} />
    </Grid>
    <Grid item xs={3} sx={{ textAlign: 'right' }}>
      <Typography>{fCurrency(item.unitPrice)}</Typography>
    </Grid>
    <Grid item xs={3} mb={1}></Grid>
    <Grid item xs={6} mb={1}>
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
    </Grid>
    <Grid item xs={3} sx={{ textAlign: 'right' }} mb={1}>
      <Typography>{fCurrency(item.subTotal)}</Typography>
    </Grid>
  </>
);

const DeliveryInfo = ({ zoneCode, addr1, addr2, tel, memo, setZoneCode, setAddr1, setAddr2, setTel, setMemo, handleComplete }) => {
  const deliveryMemos = useMemo(() => ['선택 안 함', '문앞에 놓아주세요', '부재시 연락 부탁드려요', '배송 전 미리 연락해 주세요', '부재시 1층 택배 보관장소에 맡겨주세요'], []);
  
  return (
    <>
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
          <Grid item xs={12} sm={6}>
            <TextField required margin="dense" value={addr2} label="상세주소" fullWidth onChange={e => setAddr2(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhoneNumberInput tel={tel} setTel={setTel} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="memo">배송메모</InputLabel>
              <Select required margin="dense" name='memo' label="배송메모" id='memo' value={memo} onChange={e => setMemo(e.target.value)}>
                {deliveryMemos.map(delMemo => (
                  <MenuItem value={delMemo} key={'e'+delMemo}>
                    {delMemo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default function CartWidget({ count }) {
  const [open, setOpen] = useState(false);
  const [cartData, setCartData] = useState({
    itemCount: count,
    totalPrice: 0,
    wholePrice: 0,
    items: [],
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    addr1: '',
    addr2: '',
    tel: '',
    memo: '선택 안 함',
    zoneCode: '',
  });

  const uid = sessionStorage.getItem('sessionUid');
  const email = sessionStorage.getItem('sessionEmail');
  const isSmUp = useMediaQuery(theme => theme.breakpoints.up('sm'));

  const navigate = useNavigate();
  const { insertRecord: insertOrderRecord } = useOrders();
  const { cartList, getCart, insertCartItem, updateCartItem, deleteCartItem } = useCart();

  const handleOpen = async () => {
    const tempList = await getCart(uid, email);
    let tPrice = tempList.reduce((acc, curr) => acc + curr.subTotal, 0);
    let wPrice = tPrice < 20000 ? tPrice + DELIVERY_COST : tPrice;

    setCartData({
      itemCount: tempList.length,
      totalPrice: tPrice,
      wholePrice: wPrice,
      items: tempList,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePlus = index => {
    let updatedItems = [...cartData.items];
    if (updatedItems[index].quantity < 100) {
      updatedItems[index].quantity += 1;
      updateCartAndTotals(updatedItems);
    }
  };

  const handleMinus = index => {
    let updatedItems = [...cartData.items];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      updateCartAndTotals(updatedItems);
    }
  };

  const handleDelete = index => {
    let updatedItems = [...cartData.items];
    updatedItems.splice(index, 1);
    updateCartAndTotals(updatedItems);
  };

  const updateCartAndTotals = updatedItems => {
    const tPrice = updatedItems.reduce((acc, curr) => acc + curr.subTotal, 0);
    const wPrice = tPrice < 20000 ? tPrice + DELIVERY_COST : tPrice;

    setCartData({
      ...cartData,
      items: updatedItems,
      totalPrice: tPrice,
      wholePrice: wPrice,
    });
  };

  const handleComplete = useCallback(data => {
    const { address, zonecode } = data;
    setDeliveryInfo({ ...deliveryInfo, addr1: address, zoneCode: zonecode });
  }, [deliveryInfo]);

  const handleSaveOrder = async () => {
    const res = await insertOrderRecord({
      uid: uid,
      ...cartData,
      ...deliveryInfo,
    });

    if (res) {
      setCartData({ ...cartData, itemCount: 0, totalPrice: 0, wholePrice: 0, items: [] });
      setDeliveryInfo({ addr1: '', addr2: '', tel: '', memo: '선택 안 함', zoneCode: '' });
      await getCart(uid, email); // to refresh the cart
      handleClose();
    }
  };

  const cartItemElements = useMemo(() => (
    isSmUp
      ? cartData.items.map((item, index) => (
          <CartItemRow
            key={item.id}
            item={item}
            index={index}
            handleMinus={handleMinus}
            handlePlus={handlePlus}
            handleDelete={handleDelete}
          />
        ))
      : cartData.items.map((item, index) => (
          <CartItemGrid
            key={item.id}
            item={item}
            index={index}
            handleMinus={handleMinus}
            handlePlus={handlePlus}
            handleDelete={handleDelete}
          />
        ))
  ), [isSmUp, cartData.items, handleMinus, handlePlus, handleDelete]);

  return (
    <>
      <StyledRoot onClick={handleOpen}>
        <Badge showZero badgeContent={count} color="error" max={99}>
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
        </Badge>
      </StyledRoot>

      <Dialog maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4">장바구니</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {cartData.itemCount === 0 ? (
            <Typography variant="subtitle1">장바구니가 비어 있습니다.</Typography>
          ) : (
            <>
              <Typography variant="subtitle1">{`총 ${cartData.itemCount}개`}</Typography>
              <Divider sx={{ my: 2 }} />
              {isSmUp ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>상품</TableCell>
                      <TableCell align="center">색상</TableCell>
                      <TableCell align="right">단가</TableCell>
                      <TableCell align="center">수량</TableCell>
                      <TableCell align="right">합계</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{cartItemElements}</TableBody>
                </Table>
              ) : (
                <Grid container>
                  {cartItemElements}
                </Grid>
              )}
            </>
          )}
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" justifyContent="flex-end">
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">{`상품가격: ${fCurrency(cartData.totalPrice)}`}</Typography>
              <Typography variant="subtitle1">{`배달요금: ${fCurrency(cartData.totalPrice < 20000 ? DELIVERY_COST : 0)}`}</Typography>
              <Typography variant="subtitle1">{`합계: ${fCurrency(cartData.wholePrice)}`}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <DeliveryInfo {...deliveryInfo} setZoneCode={setZoneCode} setAddr1={setAddr1} setAddr2={setAddr2} setTel={setTel} setMemo={setMemo} handleComplete={handleComplete} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>취소</Button>
          <Button variant="contained" onClick={handleSaveOrder}>주문하기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
