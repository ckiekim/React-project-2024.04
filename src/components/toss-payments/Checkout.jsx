import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import useNotification from '../../sections/notification/useNotification';
import { fCurrency } from '../../utils/format-number';

const widgetClientKey = process.env.REACT_APP_TOSS_WIDGET_CLIENT_KEY;
const customerKey = process.env.REACT_APP_TOSS_CUSTOMER_KEY;

export function CheckoutPage() {
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(0); 
  const location = useLocation();
  const { order } = location.state || {};

  const email = process.env.REACT_APP_ADMIN_USER;
  const { insertRecord } = useNotification(email);

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget === null || !order) {
      return;
    }

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
  }, [paymentWidget, order]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) 
      return;

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
        successUrl: `${process.env.REACT_APP_TOSS_CALLBACK_URL}/toss/success`,
        failUrl: `${process.env.REACT_APP_TOSS_CALLBACK_URL}/toss/fail`,
      });
      
    } catch (error) {
      insertRecord.mutate({ email, type: '오류', 
        description: '결제시 에러가 발생하였습니다. ' + error });
      console.log("Error requesting payment:", error)

      /*
      console.error("Error requesting payment:", error);
      
      // 에러 처리
      if (error.message.includes("SDKBridgeError")) {
        // Bridge 연결이 끊어졌을 때의 처리
        console.error("Bridge 연결이 끊겼습니다.");
        // 적절한 에러 메시지 표시 또는 사용자에게 안내
      } else {
        // 기타 일반적인 에러 처리
        // 여기에는 서버로부터 받은 오류나 네트워크 문제 등에 대한 처리를 할 수 있습니다.
      }
      */
    }
};
  
  return (
    <div style={{ padding: 50, textAlign: 'center' }}>
      <Card>
        <CardContent>
          <Typography mt={3} variant='h5'>
            주문금액: {fCurrency(price)} 원
          </Typography>
          <div id="payment-widget" />
          <div id="agreement" />
          <div style={{ marginTop: 20 }}>
            <Button variant="contained" style={{ backgroundColor: 'grey' }} onClick={handlePaymentRequest}>
              결제하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
