import { Fragment } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from '../../utils/format-number';

export default function CartItemGrid({ item, index, handleMinus, handlePlus, handleDelete }) {
	return (
		<Fragment key={item.id}>
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
		</Fragment>
	);
}