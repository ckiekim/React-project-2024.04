import { useState } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

// import { userInfo } from '../../../_mock/user';
import useUserInfo from '../useUserInfo';
import Scrollbar from '../../../components/scrollbar';
import LoadingProgress from '../../../components/loading-progress';
import TableNoData from '../../../components/table-no-data';
import UserInfoTableRow from '../userInfo-table-row';
import UserInfoTableHead from '../userInfo-table-head';
import TableEmptyRows from '../../../components/table-empty-rows';
import UserInfoTableToolbar from '../userInfo-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { formatAgo } from '../../../utils/format-time';

// ----------------------------------------------------------------------

export default function UserInfoPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { getList: {isLoading, data: userInfo} } = useUserInfo();

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userInfo.map((n) => n.displayName);
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
    const a = event.target.value;
    console.log(a);
    setFilterName(a);
  };

  const dataFiltered = userInfo && applyFilter({
    inputData: userInfo,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = userInfo && !dataFiltered.length && !!filterName;

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">사용자 정보</Typography>
        {/* <UserInfoInsertDialog /> */}
      </Stack>

      {isLoading && <LoadingProgress />}
      {userInfo && <Card>
        <UserInfoTableToolbar numSelected={selected.length} filterName={filterName}
          onFilterName={handleFilterByName}/>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserInfoTableHead
                order={order} orderBy={orderBy} rowCount={userInfo.length} numSelected={selected.length}
                onRequestSort={handleSort} onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'displayName', label: '이름' },
                  { id: 'email', label: '이메일' },
                  { id: 'job', label: '직업' },
                  { id: 'role', label: '역할' },
                  // { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: '상태' },
                  { id: 'registeredAt', label: '등록' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserInfoTableRow
                      key={row.uid} uid={row.uid} email={row.email} displayName={row.displayName}
                      avatarUrl={row.avatarUrl} job={row.job} role={row.role} status={row.status}
                      registeredAt={formatAgo(row.registeredAt, 'ko')}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows height={70} numCols={7}
                  emptyRows={emptyRows(page, rowsPerPage, userInfo.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page} component="div" count={userInfo.length} rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage} rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>}
    </Container>
  );
}
