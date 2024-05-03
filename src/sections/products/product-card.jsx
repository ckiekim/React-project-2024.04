import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatAgo } from '../../utils/format-time';
import { fCurrency } from '../../utils/format-number';
import { ColorPreview } from '../../components/color-utils';
import Label from '../../components/label';
import ProductUpdateDialog from './product-update-dialog';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => {  setOpen(false); };
  const handleProduct = () => {
    console.log('handleProduct()');
  }


  const renderStatus = (
    (product.status !== 'default') &&
      <Label variant="filled" color={(product.status === 'sale' && 'error') || 'info'}
        sx={{ zIndex: 9, top: 16, right: 16, position: 'absolute', textTransform: 'uppercase', }}
      >
        {product.status}
      </Label>
  );

  const renderImg = (
    <Box component="img" src={product.cover} alt={product.name}
      sx={{ top: 0, width: 1, height: 1, objectFit: 'cover', position: 'absolute', }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography component="span" variant="body1"
        sx={{ color: 'text.disabled', textDecoration: 'line-through', }}
      >
        {product.priceSale && fCurrency(product.priceSale)}
      </Typography>
      &nbsp;
      &#8361; {fCurrency(product.price)}
    </Typography>
  );

  return (
    <>
      <Card>
        <Link onClick={handleClickOpen}>
          <Box sx={{ pt: '100%', position: 'relative' }}>
            {product.status && renderStatus}
            {renderImg}
          </Box>
        </Link>

        <Stack spacing={2} sx={{ p: 3 }}>
          <ProductUpdateDialog product={product} />
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <ColorPreview colors={product.colors} />
            {renderPrice}
          </Stack>
        </Stack>
      </Card>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>상품 상세조회</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs={6} alignItems="center">
              <img src={product.cover} alt='product' width='80%' />
              <Typography variant='h6'>상품명: {product.name}</Typography>
              <Typography>{formatAgo(product.releasedAt, 'ko')}</Typography>
            </Grid>
            <Grid item xs={6} alignItems="center">
              <Typography>{product.price}</Typography>
              {product.priceSale && <Typography>{product.priceSale}</Typography>}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">복귀</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
