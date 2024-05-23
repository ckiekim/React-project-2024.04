import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const order = {
  email: 'james@gmail.com',
  name: '제임스',
  postCode: 16384,
  addr: '경기 용인시 수지구 성복2로 10',
  detailAddr: '123-1203',
  tel: '010-2345-6789',
  req: '문앞에 놓아주세요',
  totalPrice: 123000, // 총 결제 금액 추가
  orderId: 'abcd-101xyz',
};
const orderItemData = [
  {iid:83, ioid:24, count:1, price:123000, oid:null}
];

export default function YoutubeView() {
  const navigate = useNavigate();
  const data = {
    order: order,  // 주문 정보
    orderItems: orderItemData  // 주문 아이템 정보
  };

  const gotoToss = () => {
    navigate('/toss/checkout', {
      state: { orderData: data },
    });
  };

  return (
    <Container>
      <Typography variant="h4" mb={5}>Youtube</Typography>
      
      <Button variant='outlined' onClick={gotoToss}>
        TOSS API 결제하기
      </Button>
    </Container>
  )
}