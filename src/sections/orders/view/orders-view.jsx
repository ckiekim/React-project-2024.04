import { useState } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

import useOrders from '../useOrders';
import OrdersTableRow from '../orders-table-row';
import OrdersTableHead from '../orders-table-head';
import OrdersTableToolbar from '../orders-table-toolbar';
import TableEmptyRows from '../../../components/table-empty-rows';
import TableNoData from '../../../components/table-no-data';
import Scrollbar from '../../../components/scrollbar';
import LoadingProgress from '../../../components/loading-progress';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function OrdersView() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('email');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { getList: {isLoading, data: orders} } = useOrders();
  
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orders.map((n) => n.email);
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
  const dataFiltered = orders && applyFilter({
    inputData: orders,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = orders && !dataFiltered.length && !!filterName;

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">주문 내역</Typography>
      </Stack>

      {isLoading && <LoadingProgress />}
      {orders && <Card>
        <OrdersTableToolbar numSelected={selected.length} filterName={filterName}
          onFilterName={handleFilterByName}/>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OrdersTableHead
                order={order} orderBy={orderBy} rowCount={orders.length} numSelected={selected.length}
                onRequestSort={handleSort} onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'email', label: '이메일' },
                  { id: 'orderedAt', label: '주문시간' },
                  { id: 'items', label: '주문상품' },
                  { id: 'wholePrice', label: '총 금액' },
                  { id: 'deliveryInfo', label: '배송정보' },
                  { id: 'status', label: '상태' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <OrdersTableRow
                      order={row}
                      selected={selected.indexOf(row.email) !== -1}
                      handleClick={(event) => handleClick(event, row.email)}
                    />
                  ))
                }

                <TableEmptyRows height={70} numCols={7}
                  emptyRows={emptyRows(page, rowsPerPage, orders.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page} component="div" count={orders.length} rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage} rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>}
    </Container>
  );  
}