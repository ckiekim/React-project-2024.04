import { Helmet } from 'react-helmet-async';

import { MessageView } from '../sections/message/view';

// ----------------------------------------------------------------------

export default function MessagePage() {
  return (
    <>
      <Helmet>
        <title> Message | CK React World </title>
      </Helmet>

      <MessageView />
    </>
  );
}
