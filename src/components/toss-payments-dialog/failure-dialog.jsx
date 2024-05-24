import { useSearchParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

export default function FailureDialog({ open, onClose }) {
  const [searchParams] = useSearchParams();

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>결제 실패</DialogTitle>
      <DialogContent>
        <Typography color="textSecondary" gutterBottom>
          {`에러 코드: ${searchParams.get("code")}`}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {`실패 사유: ${searchParams.get("message")}`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined'>확인</Button>
      </DialogActions>
    </Dialog>
  );
}