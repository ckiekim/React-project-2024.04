import { Helmet } from 'react-helmet-async';

import { YoutubeView } from '../sections/youtube/view';

// ----------------------------------------------------------------------

export default function YoutubePage() {
  return (
    <>
      <Helmet>
        <title> Youtube | CK React World </title>
      </Helmet>

      <YoutubeView />
    </>
  );
}
