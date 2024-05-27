import { Helmet } from 'react-helmet-async';

import { AlbumView } from '../sections/album/view';

// ----------------------------------------------------------------------


export default function AlbumPage() {
  return (
    <>
      <Helmet>
        <title> Album | CK React World </title>
      </Helmet>

      <AlbumView />
    </>
  );
}
