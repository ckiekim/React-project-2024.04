import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

import Scrollbar from '../../../components/scrollbar';
import TableEmptyRows from '../../../components/table-empty-rows';
import TableNoData from '../../../components/table-no-data';
import MessageTableToolbar from '../message-table-toolbar';
import MessageInsertDialog from '../message-insert-dialog';
import MessageTableHead from '../message-table-head';
import MessageTableRow from '../message-table-row';
import useMessage from '../useMessage';
import useNotification from '../../notification/useNotification';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function MessageView() {
  const sessionEmail = sessionStorage.getItem('sessionEmail');
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { getList: {isLoading, data: messageList} } = useMessage(sessionEmail);
  const { notifications, updateRecord } = useNotification(sessionEmail); 
  
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = messageList.map((n) => n.srcName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const dataFiltered = messageList && applyFilter({
    inputData: messageList,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = messageList && !dataFiltered.length && !!filterName;

  useEffect(() => {
    if (notifications) {
      notifications.forEach(notification => {
        if (notification.type === '메세지' && notification.status === '신규')
          updateRecord.mutate({ ...notification, status: '읽음' });
      });
    }
  }, [notifications]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">메세지</Typography>
        <MessageInsertDialog />
      </Stack>

      {isLoading && <p>로딩중...</p>}
      {messageList && <Card>
        <MessageTableToolbar numSelected={selected.length} filterName={filterName}
          onFilterName={handleFilterByName}/>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <MessageTableHead
                order={order} orderBy={orderBy} rowCount={messageList.length} numSelected={selected.length}
                onRequestSort={handleSort} onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'srcName', label: '보낸이' },
                  { id: 'content', label: '내용' },
                  { id: 'status', label: '상태' },
                  { id: 'registeredAt', label: '발송' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <MessageTableRow
                      message={row}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows height={70} numCols={5}
                  emptyRows={emptyRows(page, rowsPerPage, messageList.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page} component="div" count={messageList.length} rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage} rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>}
    </Container>
  );
}