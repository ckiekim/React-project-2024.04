import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import TableCell from "@mui/material/TableCell";

import { getDayInfo } from './util';
import AnnivDetailDialog from './anniv-detail-dialog';
import SchedInsertDialog from './sched-insert-dialog';
import SchedDetailDialog from './sched-detail-dialog';
import useAnniv from '../../hooks/useAnniv';
import useSched from '../../hooks/useSched';

export default function ScheduleCell({ ymd, yearMonth, isToday }) {
  const { day, date } = getDayInfo(ymd);
  const isOtherMonth = ymd.substring(4,6) !== yearMonth.substring(5);

  const [color, setColor] = useState('');
  const { getList: {data: anniversary} } = useAnniv(ymd);
  const { getList: {data: schedule} } = useSched(ymd);

  useEffect(() => {
    setColor((date === 0) ? 'error' : (date === 6) ? 'primary' : '');
  }, [date]);
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
            background: isToday ? '#efffff' : '' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
        <SchedInsertDialog ymd={ymd} day={day} color={color} isOtherMonth={isOtherMonth} />

        {anniversary &&
          <Stack direction='row' spacing={0.2}>
            {anniversary.map((anniv, index) => (
              <AnnivDetailDialog key={anniv.id} anniv={anniv} index={index} middot={anniversary.length > 1} />
            ))}
          </Stack>
        }
      </Stack>
      {schedule &&
        schedule.map(sched => (
          <SchedDetailDialog key={sched.id} sched={sched} />
        ))
      }
    </TableCell>
  );
}