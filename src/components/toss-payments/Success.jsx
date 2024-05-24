import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import useOrders from '../../sections/orders/useOrders';
import useNotification from '../../sections/notification/useNotification';
import { fCurrency } from '../../utils/format-number';

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oid = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const paymentKey = searchParams.get('paymentKey');
  // console.log(email, oid, amount, paymentKey);

  const [flag, setFlag] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const email = sessionStorage.getItem('sessionEmail');

  const { getRecord: {data: order}, updateRecord: updateOrderRecord } = useOrders(oid);
  const { insertRecord: insertNotiRecord } = useNotification(email);

  useEffect(() => {
    if (!order)
      return;
    if (!flag) {
      updateOrderRecord.mutate({ ...order, status: '결제완료', paymentKey });
      insertNotiRecord.mutate({ email, type: '주문', description: '결제가 완료되었습니다.' });
      setFlag(true);
    }
  }, [order]);

  useEffect(() =>{
    const interval  = setInterval (() =>{
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/order');   // Replace '/' with your home page path
    }
  }, [countdown, navigate]);
  
  return (
    <Card variant="outlined" 
      style={{ maxWidth: 400, margin: 'auto', marginTop: 50, padding: 20, marginBottom: 50 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          결제 성공
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {`주문번호: ${oid}`}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {`결제 금액: ${fCurrency(amount)}원`}
        </Typography>
        <Typography>
          {`${countdown}초 후에 홈페이지로 이동합니다`}
        </Typography>
      </CardContent>
    </Card>
  );
}