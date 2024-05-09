import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import TableCell from "@mui/material/TableCell";
import Typography from '@mui/material/Typography';

import { getDayInfo } from './util';
import { getAnnivList } from '../../api/firebase';

export default function ScheduleCell({ ymd, yearMonth }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHoliday, setIsHoliday] = useState(false);
  const [annivs, setAnnivs] = useState('');
  const { day, date } = getDayInfo(ymd);
  const isOtherMonth = ymd.substring(4,6) !== yearMonth.substring(5);
  const color = (date === 0 || isHoliday) ? 'error' : (date === 6) ? 'primary' : '';

  useEffect(() => {
    getAnnivList(ymd)
      .then(result => { 
        let str = ''; 
        if (result)
          result.forEach((anniv, index) => {
            if (anniv.isHoliday === true) 
              setIsHoliday(true);
            console.log(anniv.isHoliday);
          });
      })
      .then(setIsLoading(false));
  }, []);

  return (
    <TableCell sx={{ verticalAlign: 'top', height: '120px', border: 1, py: 1 }} key={ymd}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
        <Typography sx={{ fontWeight: 'bold', opacity: isOtherMonth ? 0.5 : 1 }} 
          color={color}>
          {day}
        </Typography>
        {!isLoading && 
          <Typography>{annivs}</Typography>
        }
      </Stack>
      <Typography>{isOtherMonth ? '다른 달' : '이번 달'}</Typography>
      <Typography>{color}</Typography>
    </TableCell>
  );
}