import { Helmet } from 'react-helmet-async';

import { BoardView } from '../sections/board/view';

// ----------------------------------------------------------------------


export default function BoardPage() {
  return (
    <>
      <Helmet>
        <title> Board | CK React World </title>
      </Helmet>

      <BoardView />
    </>
  );
}
