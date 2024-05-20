import { Helmet } from 'react-helmet-async';

import { TmdbView } from '../sections/tmdb/view';

// ----------------------------------------------------------------------

export default function TmdbPage() {
  return (
    <>
      <Helmet>
        <title> TMDB | CK React App </title>
      </Helmet>

      <TmdbView />
    </>
  );
}
