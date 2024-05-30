import { useState } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

import BoardTableRow from '../board-table-row';
import BoardTableHead from '../board-table-head';
import BoardTableToolbar from '../board-table-toolbar';
import TableEmptyRows from '../../../components/table-empty-rows';
import TableNoData from '../../../components/table-no-data';
import Scrollbar from '../../../components/scrollbar';
import LoadingProgress from '../../../components/loading-progress';
import { emptyRows, applyFilter, getComparator } from '../utils';
import useUserInfo from '../../../hooks/useUserInfo';
import useBoard from '../../../hooks/useBoard';
import BoardInsertDialog from '../board-insert-dialog';

export default function BoardView() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('email');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { getRecord: { data: account } } = useUserInfo({ uid: sessionStorage.getItem('sessionUid') });
  const { getList: { isLoading, data: boards } } = useBoard();

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = boards.map((n) => n.bid);
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
  const dataFiltered = boards && applyFilter({
    inputData: boards,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = boards && !dataFiltered.length && !!filterName;

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">게시판</Typography>
        {account &&  <BoardInsertDialog account={account} />}
      </Stack>

      {isLoading && <LoadingProgress />}
      {boards && <Card>
        <BoardTableToolbar numSelected={selected.length} filterName={filterName}
          onFilterName={handleFilterByName}/>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <BoardTableHead
                order={order} orderBy={orderBy} rowCount={boards.length} numSelected={selected.length}
                onRequestSort={handleSort} onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'title', label: '제목' },
                  { id: 'writer', label: '글쓴이' },
                  { id: 'modifiedAt', label: '작성시간' },
                  { id: 'viewCount', label: '조회수' },
                  { id: 'likeCount', label: '좋아요' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <BoardTableRow
                      board={row} account={account}
                      selected={selected.indexOf(row.bid) !== -1}
                      handleClick={(event) => handleClick(event, row.bid)}
                    />
                  ))
                }

                <TableEmptyRows height={70} numCols={6}
                  emptyRows={emptyRows(page, rowsPerPage, boards.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page} component="div" count={boards.length} rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage} rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>}
    </Container>
  );
}