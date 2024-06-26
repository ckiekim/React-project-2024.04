import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import { products } from '../../../_mock/products';
import useProducts from '../../../hooks/useProducts';
import useCart from '../../../hooks/useCart';
import LoadingProgress from '../../../components/loading-progress';
import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';
import ProductInsertDialog from '../product-insert-dialog';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const uid = sessionStorage.getItem('sessionUid');
  const [openFilter, setOpenFilter] = useState(false);
  const { getList: {isLoading, data: products} } = useProducts();
  const { cart } = useCart(uid);
  const [cartCount, setCartCount] = useState(0);

  const handleOpenFilter = () => { setOpenFilter(true); };
  const handleCloseFilter = () => { setOpenFilter(false); };

  useEffect(() => {
    if (cart)
      setCartCount(cart.itemCount);
    else
      setCartCount(0);
  }, [cart]);

  return (
    <Container maxWidth="xl">
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

      {isLoading && <LoadingProgress />}
      {products && 
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      }

      <ProductCartWidget count={cartCount} />
    </Container>
  );
}
