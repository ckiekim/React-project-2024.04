import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from '../../routes/components';

import Logo from '../../components/logo';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  const renderHeader = (
    <Box
      component="header"
      sx={{ top: 0, left: 0, width: 1, lineHeight: 0, position: 'fixed',
          p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }), }}
    >
      <Logo />
    </Box>
  );

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{ py: 12, maxWidth: 540, mx: 'auto', display: 'flex', minHeight: '100vh',
            textAlign: 'center', alignItems: 'center', flexDirection: 'column',
            justifyContent: 'center', }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            요청하신 페이지를 찾을 수 없습니다.
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            죄송합니다. 원하시는 페이지를 찾을 수 없습니다.<br />
            아마도 URL을 잘못 입력하신거 같습니다. 철자를 꼭 확인하세요.
          </Typography>

          <Box
            component="img" src="/assets/illustrations/illustration_404.svg"
            sx={{ mx: 'auto', height: 260, my: { xs: 5, sm: 10 }, }}
          />

          <Button href="/" size="large" variant="contained" component={RouterLink}>
            홈으로
          </Button>
        </Box>
      </Container>
    </>
  );
}
