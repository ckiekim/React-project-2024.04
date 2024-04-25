import { Helmet } from 'react-helmet-async';

import { ScheduleView } from '../sections/schedule/view';

// ----------------------------------------------------------------------

export default function SchedulePage() {
  return (
    <>
      <Helmet>
        <title> Schedule | CK React App </title>
      </Helmet>

      <ScheduleView />
    </>
  );
}
