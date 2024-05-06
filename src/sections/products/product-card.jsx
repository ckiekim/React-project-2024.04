import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from '../../utils/format-number';
import { ColorPreview } from '../../components/color-utils';
import Label from '../../components/label';
import ProductUpdateDialog from './product-update-dialog';
import ProductDetailDialog from './product-detail-dialog';

// ----------------------------------------------------------------------

export const renderStatus = product =>
  ((product.status !== 'default') &&
    <Label variant="filled" color={(product.status === 'sale' && 'error') || 'info'}
      sx={{ zIndex: 9, top: 16, right: 16, position: 'absolute', textTransform: 'uppercase', }}
    >
      {product.status}
    </Label>);

const renderImg = product => (
  <Box component="img" src={product.cover} alt={product.name}
    sx={{ top: 0, width: 1, height: 1, objectFit: 'cover', position: 'absolute', }}
  />
);

export const renderPrice = product => (
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

export default function ShopProductCard({ product, handleCart }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => { setOpen(true); };

  return (
    <>
      <Card>
        <Link onClick={handleClickOpen}>
          <Box sx={{ pt: '100%', position: 'relative', "&:hover": {transform: 'scale(1.05)'} }}>
            {product.status && renderStatus(product)}
            {renderImg(product)}
          </Box>
        </Link>

        <Stack spacing={2} sx={{ p: 3 }}>
          <ProductUpdateDialog product={product} />
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <ColorPreview colors={product.colors} />
            {renderPrice(product)}
          </Stack>
        </Stack>
      </Card>
      
      <ProductDetailDialog dialogOpen={open} dialogHandle={setOpen} product={product} handleCart={handleCart} />
    </>
  );
}
