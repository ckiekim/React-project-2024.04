import { Helmet } from 'react-helmet-async';

import { DemoView } from '../sections/demo';

// ----------------------------------------------------------------------

export default function DemoPage() {
  return (
    <>
      <Helmet>
        <title> Demo | CK React World </title>
      </Helmet>

      <DemoView />
    </>
  );
}
