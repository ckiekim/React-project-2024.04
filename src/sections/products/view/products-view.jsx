import { useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import { products } from '../../../_mock/products';
import useProducts from '../useProducts';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';
import ProductInsertDialog from '../product-insert-dialog';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const { getList: {isLoading, data: products} } = useProducts();
  const [cartCount, setCartCount] = useState(0);

  const handleOpenFilter = () => { setOpenFilter(true); };
  const handleCloseFilter = () => { setOpenFilter(false); };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">상품</Typography>
        <ProductInsertDialog />
      </Stack>

      <Stack direction="row" alignItems="center" flexWrap="wrap-reverse"
        justifyContent="flex-end" sx={{ mb: 5 }}>
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
          <ProductSort />
        </Stack>
      </Stack>

      {isLoading && <p>로딩중...</p>}
      {products && <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} handleCart={setCartCount} />
          </Grid>
        ))}
      </Grid>}

      <ProductCartWidget count={cartCount} handleCount={setCartCount} />
    </Container>
  );
}
