import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import useNotification from '../../hooks/useNotification';
import { fCurrency } from '../../utils/format-number';

const widgetClientKey = process.env.REACT_APP_TOSS_WIDGET_CLIENT_KEY;
const customerKey = process.env.REACT_APP_TOSS_CUSTOMER_KEY;

export default function CheckoutDialog({ open, onClose }) {
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(0); 
  const location = useLocation();
  const { order } = location.state || {};

  const email = process.env.REACT_APP_ADMIN_USER;
  const { insertRecord } = useNotification(email);

  const url = process.env.NODE_ENV === 'development' ?
    `http://localhost:3000/ck-react-world` :      // 개발 모드 (development)
    `https://ckiekim.github.io/ck-react-world`;   // 배포 모드 (production)
  const navigate = useNavigate();
  const handleClose = () => {
    onClose();
    navigate('/products');
  }
  useEffect(() => {
    const fetchPaymentWidget = async () => {
      if (!open) return;
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };
    fetchPaymentWidget();
  }, [open]);

  useEffect(() => {
    if (paymentWidget === null || !order) return;

    // 주문 총 금액 설정
    const wholePrice = order.wholePrice;
    setPrice(wholePrice);

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: wholePrice },
      { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement(
      "#agreement", 
      { variantKey: "AGREEMENT" }
    );

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, order, open]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) return;

    paymentMethodsWidget.updateAmount(price);
  }, [price]);
  
  const handlePaymentRequest = async () => {
    try {
      // 주문 정보를 이용하여 결제 요청을 보냄
      await paymentWidget?.requestPayment({
        orderId: order.oid,
        orderName: `${order.items[0].pname} ${order.items.length > 1 ? '외 ' + (order.items.length - 1) : ''}`, // 주문명을 설정
        customerEmail: order.email || "",   // 주문자 이메일 설정
        customerTel: order.deliveryInfo.tel,  // 주문자 전화번호 설정
        // successUrl: `${window.location.origin}/toss/success`,
        // failUrl: `${window.location.origin}/toss/fail`,
        successUrl: `${url}/toss/success`,
        failUrl: `${url}/toss/fail`,
      });
      
    } catch (error) {
      insertRecord.mutate({ email, type: '오류', 
        description: '결제시 에러가 발생하였습니다. ' + error });
      console.log("Error requesting payment:", error)
    }
  };
  
  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <DialogTitle>결제</DialogTitle>
      <DialogContent>
        <Typography mt={3} variant='h5'>
          주문금액: {fCurrency(price)} 원
        </Typography>
        <div id="payment-widget" />
        <div id="agreement" />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handlePaymentRequest}>
          결제하기
        </Button>
        <Button onClick={handleClose} variant='outlined'>취소</Button>
      </DialogActions>
    </Dialog>
  );
}
