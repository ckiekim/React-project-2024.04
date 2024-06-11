const navConfig = [
  { title: '대시보드', path: '/', icon: 'carbon:dashboard', },
  { title: '스케쥴러', path: '/schedule', icon: 'uil:schedule', },
  { title: '영화 (TMDB)', path: '/tmdb', icon: 'bx:camera-movie', },
  { title: '게시판', path: '/board', icon: 'solar:clipboard-linear', },
  { title: '상품', path: '/products', icon: 'icon-park-outline:ad-product', },
  { title: '주문', path: '/order', icon: 'ci:shopping-cart-01', },
  { title: '블로그', path: '/blog', icon: 'ri:blogger-fill', },
  { title: '앨범', path: '/album', icon: 'icon-park-outline:picture-album', },
  { title: '메세지', path: '/message', icon: 'tabler:message', },
  { title: '사용자 정보', path: '/userInfo', icon: 'bxs:user', },
  { title: '로그인', path: '/login', icon: 'mdi:login-variant', },
  { title: '에러', path: '/404', icon: 'ic:round-location-disabled', },
  { title: '화면 데모', path: '/demo', icon: 'carbon:demo', },
];

// if (process.env.NODE_ENV === 'development') {
//   navConfig.push({ title: 'Youtube', path: '/youtube', icon: 'ri:youtube-line' });
// }

export default navConfig;
