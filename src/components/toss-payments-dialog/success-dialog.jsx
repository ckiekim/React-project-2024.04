import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import useOrders from '../../hooks/useOrders';
import useNotification from '../../hooks/useNotification';
import { fCurrency } from '../../utils/format-number';

export default function SuccessDialog({ open, onClose }) {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('sessionEmail');
  const [searchParams] = useSearchParams();
  const oid = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const paymentKey = searchParams.get('paymentKey');
  // console.log(email, oid, amount, paymentKey);

  const [flag, setFlag] = useState(false);

  const { getRecord: {data: order}, updateRecord: updateOrderRecord } = useOrders(oid);
  const { insertRecord: insertNotiRecord } = useNotification(email);

  const handleClose = () => {
    navigate('/order');
    onClose();
  }

  useEffect(() => {
    if (!order)
      return;
    if (!flag) {
      updateOrderRecord.mutate({ ...order, status: '결제완료', paymentKey });
      insertNotiRecord.mutate({ email, type: '주문', description: '결제가 완료되었습니다.' });
      setFlag(true);
    }
  }, [order]);
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>결제 성공</DialogTitle>
      <DialogContent>
        <Typography color="textSecondary" gutterBottom>
          {`주문 번호: ${oid}`}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {`결제 금액: ${fCurrency(amount)}원`}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {`결제 키: ${paymentKey}`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined'>확인</Button>
      </DialogActions>
    </Dialog>
  );
}