import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  { title: '대시보드', path: '/', icon: icon('ic_analytics'), },
  { title: '스케쥴러', path: '/schedule', icon: icon('ic_schedule'), },
  { title: '영화 (TMDB)', path: '/tmdb', icon: icon('ic_movie'), },
  { title: '게시판', path: '/board', icon: icon('ic_board'), },
  { title: '상품', path: '/products', icon: icon('ic_product'), },
  { title: '주문', path: '/order', icon: icon('ic_cart'), },
  { title: '블로그', path: '/blog', icon: icon('ic_blog'), },
  { title: '앨범', path: '/album', icon: icon('ic_album'), },
  { title: '메세지', path: '/message', icon: icon('ic_message'), },
  { title: '사용자 정보', path: '/userInfo', icon: icon('ic_user'), },
  { title: '로그인', path: '/login', icon: icon('ic_lock'), },
  { title: '에러', path: '/404', icon: icon('ic_disabled'), },
  { title: 'Youtube', path: '/youtube', icon: icon('ic_youtube'), },
];

export default navConfig;
