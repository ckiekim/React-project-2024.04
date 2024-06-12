import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import Scrollbar from '../../../components/scrollbar';
import LoadingProgress from '../../../components/loading-progress';
import AnnivInsertDialog from '../anniv-insert-dialog';
import ScheduleCell from '../sched-cell';
import { getYearMonth, getCalendar, getToday } from '../util';

export default function SchedulePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [yearMonth, setYearMonth] = useState('');
  const [calendar, setCalendar] = useState([]);
  const today = getToday();
  const isSmDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const handleArrow = arrow => {
    setIsLoading(true);
    const newYearMonth = getYearMonth(yearMonth, arrow);
    setYearMonth(newYearMonth);
    getCalendar(newYearMonth)
      .then(newCalendar => { setCalendar(newCalendar); })
      .then(() => { setIsLoading(false); });
  }

  useEffect(() => {
    const newYearMonth = getYearMonth(yearMonth, '');
    setYearMonth(newYearMonth);
    getCalendar(newYearMonth)
      .then(newCalendar => { setCalendar(newCalendar); })
      .then(() => { setIsLoading(false); });
  }, []);

  return (
    <Container maxWidth="xl">
      {isSmDown ? (
        <Stack direction='column' spacing={1} mb={5}>
          <Stack direction='row' alignItems="center" justifyContent='space-between'>
            <Typography variant="h4">스케쥴러</Typography>
            <AnnivInsertDialog />
          </Stack>
          <Stack direction="row" justifyContent="center">
            <YearMonthArrow handleArrow={handleArrow} ym={yearMonth} />
          </Stack>
        </Stack>
      ) : (
        <Stack direction='row' alignItems="center" justifyContent='space-between' mb={5}>
          <Typography variant="h4">스케쥴러</Typography>
          <YearMonthArrow handleArrow={handleArrow} ym={yearMonth} />
          <AnnivInsertDialog />
        </Stack>
      )}

      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }} size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '14.286%', textAlign: 'center', border: 1 }}>
                  <Typography variant='h6' color='error'>일</Typography>
                </TableCell>
                {'월 화 수 목 금'.split(' ').map((date, index) => (
                  <TableCell sx={{ width: '14.286%', textAlign: 'center', border: 1 }}>
                    <Typography sx={{fontWeight: 'bold'}}>{date}</Typography>
                  </TableCell>
                ))}
                <TableCell sx={{ width: '14.286%', textAlign: 'center', border: 1 }}>
                  <Typography variant='h6' color='primary'>토</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && <LoadingProgress />}
              {!isLoading && calendar.map((week, rowIdx) => (
                <TableRow key={rowIdx}>
                  {week.map(day => (
                    <ScheduleCell ymd={day} yearMonth={yearMonth} isToday={today === day} />
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

    </Container>
  )
}

const YearMonthArrow = ({ handleArrow, ym }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <IconButton onClick={() => handleArrow('left2')}>
        <KeyboardDoubleArrowLeftIcon />
      </IconButton>
      <IconButton onClick={() => handleArrow('left')}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Typography variant='h6'>{ym}</Typography>
      <IconButton onClick={() => handleArrow('right')}>
        <KeyboardArrowRightIcon />
      </IconButton>
      <IconButton onClick={() => handleArrow('right2')}>
        <KeyboardDoubleArrowRightIcon />
      </IconButton>
    </Stack>
  );
}