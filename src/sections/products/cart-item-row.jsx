import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { fCurrency } from '../../utils/format-number';

export default function CartItemRow({ item, index, handleMinus, handlePlus, handleDelete }) {
	return (
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
}