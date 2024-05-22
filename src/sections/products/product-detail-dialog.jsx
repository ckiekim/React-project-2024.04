import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { renderStatus, renderPrice } from './product-card';
import { fCurrency } from '../../utils/format-number';
import useCart from './useCart';

export default function ProductDetailDialog({ dialogOpen, dialogHandle, product }) {
  const uid = sessionStorage.getItem('sessionUid');
	const [color, setColor] = useState(product.colors[0]);
	const [quantity, setQuantity] = useState(1);
	const [message, setMessage] = useState('');

	const { cart, insertRecord, updateRecord } = useCart(uid);
  const handleClose = () => { 
		dialogHandle(false); setMessage(''); setQuantity(1);
	};
  const handleColor = e => { setColor(e.target.value); };
	const handleQuantity = e => { setQuantity(e.target.value); };
  const handleProduct = () => {
		const subTotal = product.price * quantity;
		const newProduct = {id: product.id, pname: product.name, cover: product.cover, 
			unitPrice: product.price, option: color, quantity, subTotal
		}
		if (cart) {
			const items = cart.items;
			items.push(newProduct);
			const itemCount = cart.itemCount + 1;
			const totalPrice = cart.totalPrice + subTotal;
			const newCart = { id: uid, itemCount, totalPrice, items };
			updateRecord.mutate(newCart);
		} else {
			const newCart = { id: uid, itemCount: 1, totalPrice: subTotal, items: [newProduct] };
			insertRecord.mutate(newCart);
		}
		setMessage(`${color}, 수량: ${quantity}, 소계: ${fCurrency(subTotal)}원을 장바구니에 담았습니다.`);
		setTimeout(() => {
			handleClose(); 
		}, 3000);
  }

	return (
		<Dialog open={dialogOpen} onClose={handleClose}>
			<DialogTitle>
				<Typography sx={{fontWeight: 'bold', fontSize: 18}}>상품 상세조회</Typography>
			</DialogTitle>
			<IconButton aria-label="close" onClick={handleClose}
				sx={{ position: 'absolute', right: 8, top: 8, }} >
				<CloseIcon />
			</IconButton>
			<DialogContent dividers>
				<Grid container >
					<Grid item xs={12} md={6} alignItems="center">
						<Box sx={{ position: 'relative', width: '90%' }}>
							{renderStatus(product)}
							<img src={product.cover} alt='product' />
						</Box>
					</Grid>
					<Grid item xs={12} md={6} alignItems="center">
						<Typography variant='h5'>{product.name}</Typography>
						<br />
						<Typography>{renderPrice(product)}</Typography>
						<br />
						<FormControl fullWidth>
							<InputLabel id="color">색상</InputLabel>
							<Select required margin="dense" name='color' label="색상" id='color'
								value={color} onChange={handleColor}>
								{product.colors.map((item) => 
									<MenuItem value={item} key={item} alignItems='center'>
										<Stack spacing={2} direction='row' alignItems='center'>
											<Box sx={{ width: 16, height: 16, bgcolor: item, borderRadius: '50%',
													border: 'solid 2px' }} />
											<Typography>{item}</Typography>
										</Stack>
									</MenuItem>
								)}
							</Select>
						</FormControl>
						<br /><br />
						<FormControl fullWidth>
							<InputLabel id="color">수량</InputLabel>
							<Select required margin="dense" name='quantity' label="색상" id='quantity'
								value={quantity} onChange={handleQuantity}>
								{[1,2,3,4,5].map((item) => 
									<MenuItem value={item} key={item} alignItems='center'>
										<Typography>{item}</Typography>
									</MenuItem>
								)}
							</Select>
						</FormControl>
						<br /><br />
					</Grid>
				</Grid>
				{message && 
					<Stack spacing={1} direction='row' alignItems='center'>
						<Typography>컬러:</Typography>
						<Box sx={{ width: 16, height: 16, bgcolor: color, borderRadius: '50%',
							border: 'solid 2px' }} />
						<Typography>{message}</Typography>
					</Stack>
				}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleProduct} variant="contained">장바구니에 담기</Button>
				<Button onClick={handleClose} variant="outlined">복귀</Button>
			</DialogActions>
		</Dialog>
	);
}