import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: '대시보드',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: '사용자',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: '상품',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: '블로그',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: '로그인',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: '에러',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
