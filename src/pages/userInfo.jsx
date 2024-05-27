import { Helmet } from 'react-helmet-async';

import { UserInfoView } from '../sections/userInfo/view';

// ----------------------------------------------------------------------

export default function UserInfoPage() {
  return (
    <>
      <Helmet>
        <title> User Info | CK React World </title>
      </Helmet>

      <UserInfoView />
    </>
  );
}
