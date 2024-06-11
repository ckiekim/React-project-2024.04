import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const screens = [
  {src: `${process.env.PUBLIC_URL}/demo/00.대시보드.png`, name: '대시보드'},
  {src: `${process.env.PUBLIC_URL}/demo/01.스케쥴러.png`, name: '스케쥴러'},
  {src: `${process.env.PUBLIC_URL}/demo/02.영화.png`, name: '영화'},
  {src: `${process.env.PUBLIC_URL}/demo/03.게시판.png`, name: '게시판'},
  {src: `${process.env.PUBLIC_URL}/demo/04.상품.png`, name: '상품'},
  {src: `${process.env.PUBLIC_URL}/demo/05.주문.png`, name: '주문'},
  {src: `${process.env.PUBLIC_URL}/demo/06.블로그.png`, name: '블로그'},
  {src: `${process.env.PUBLIC_URL}/demo/07.앨범.png`, name: '앨범'},
  {src: `${process.env.PUBLIC_URL}/demo/08.메세지.png`, name: '메세지'},
  {src: `${process.env.PUBLIC_URL}/demo/09.사용자.png`, name: '사용자'},
  {src: `${process.env.PUBLIC_URL}/demo/10.로그인.png`, name: '로그인'},
  {src: `${process.env.PUBLIC_URL}/demo/11.에러.png`, name: '에러'},
];

export default function DemoView() {

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" mb={5}>화면 데모</Typography>
      
      <Carousel>
        {screens.map((screen, index) => (
          <Box key={index} textAlign='center'>
            <img src={screen.src} alt={screen.name}
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
            />
            <Typography variant='h6' mt={2}>
              {screen.name}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Container>
  );
}
