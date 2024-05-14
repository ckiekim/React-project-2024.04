import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export default function TableEmptyRows({ emptyRows, height, numCols }) {
  if (!emptyRows)
    return null;

  return (
    <TableRow sx={{ ...(height && { height: height * emptyRows }) }}>
      <TableCell colSpan={numCols} />
    </TableRow>
  );
}