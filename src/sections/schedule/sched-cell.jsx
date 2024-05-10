import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import TableCell from "@mui/material/TableCell";
import Typography from '@mui/material/Typography';

import { getDayInfo } from './util';
import SchedInsertDialog from './sched-insert-dialog';
import useAnniv from './useAnniv';
import useSched from './useSched';

export default function ScheduleCell({ ymd, yearMonth, isToday }) {
  const { day, date } = getDayInfo(ymd);
  const isOtherMonth = ymd.substring(4,6) !== yearMonth.substring(5);

  const [color, setColor] = useState('');
  const { getList: {data: anniversary} } = useAnniv(ymd);
  const { getList: {data: schedule} } = useSched(ymd);

  useEffect(() => {
    setColor((date === 0) ? 'error' : (date === 6) ? 'primary' : '');
  }, []);
  useEffect(() => {
    if (anniversary)
      anniversary.forEach(anniv => {
        if (anniv.isHoliday)
          setColor('error');
      });
  }, [anniversary]);

  return (
    <TableCell key={ymd} 
      sx={{ verticalAlign: 'top', height: '120px', border: 1, p: 1, 
            background: isToday ? '#D8EDE7' : '' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
        {/* <SchedInsertDialog ymd={ymd} day={day} color={color} isOtherMonth={isOtherMonth} /> */}
        <Typography sx={{ fontWeight: 'bold', opacity: isOtherMonth ? 0.5 : 1 }} 
          color={color}>
          {day}
          <SchedInsertDialog ymd={ymd} />
        </Typography>
        {anniversary &&
          <Typography>
            {anniversary.reduce((acc, anniv, index) => 
              acc + (index !== 0 ? '·' : '') + 
              ((anniv.aname.indexOf('대체') >= 0) ? anniv.aname.substring(0,5) : anniv.aname), '')}
          </Typography>
        }
      </Stack>
      {schedule &&
        schedule.map(sched => (
          <Typography sx={{ fontWeight: sched.isImportant ? 'bold' : 'normal' }}>
            {sched.startTime} {sched.title}
          </Typography>
        ))
      }
    </TableCell>
  );
}