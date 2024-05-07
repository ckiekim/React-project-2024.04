import { Helmet } from 'react-helmet-async';

import { OrdersView } from '../sections/orders/view';

// ----------------------------------------------------------------------

export default function OrdersPage() {
  return (
    <>
      <Helmet>
        <title> Orders | CK React App </title>
      </Helmet>

      <OrdersView />
    </>
  );
}
