import { useState } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

import MessageInsertDialog from '../message-insert-dialog';
import MessageTableRow from '../message-table-row';
import useMessage from '../useMessage';

export default function MessageView() {
  const sessionEmail = sessionStorage.getItem('sessionEmail');
  const { getList: {isLoading, data: messageList} } = useMessage(sessionEmail);
  
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">메세지</Typography>
        <MessageInsertDialog />
      </Stack>

      {isLoading && <p>로딩중...</p>}
      {messageList &&
        messageList.map(message => (
          <MessageTableRow message={message} />
        ))
      }
    </Container>
  );
}