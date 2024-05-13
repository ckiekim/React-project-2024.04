import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { bgGradient } from '../../theme/css';
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { login, register } from '../../api/firebase';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({email: '', password: ''})
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleChange = e => {
    setLoginInfo({...loginInfo, [e.target.name]: e.target.value});
  }
  const handleSubmit = e => {
    if (isLoginMode) {
      login(loginInfo); 
    } else {
      register(loginInfo);
    }
    navigate('/');
  }
  const handleMode = () => { setIsLoginMode(!isLoginMode); }

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{ position: 'fixed', top: { xs: 16, md: 24 }, left: { xs: 16, md: 24 }, }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card sx={{ p: 5, width: 1, maxWidth: 420, }}>
          <Typography variant="h4">
            CK World {isLoginMode ? '로그인' : '회원가입'}
          </Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            {isLoginMode ? '계정이 없으신가요?' : '이미 회원이신가요?'}
            <Button variant='text' sx={{ ml: 0.5 }} onClick={handleMode}>
              {isLoginMode ? '등록하기' : '로그인'}
            </Button>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button fullWidth size="large" color="inherit" variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}> OR </Typography>
          </Divider>

          <Stack spacing={3}>
            <TextField name="email" onChange={handleChange} label="이메일" />
            <TextField name="password" label="패스워드" onChange={handleChange} 
              type={showPassword ? 'text' : 'password'}
              InputProps={{ endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }} 
            />
          </Stack>
          
          <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
            <Link variant="subtitle2" underline="hover">
              {isLoginMode ? '패스워드를 잊으셨나요?' : ' '}
            </Link>
          </Stack>

          <LoadingButton fullWidth variant="contained" color="inherit" onClick={handleSubmit}>
            <Typography sx={{fontWeight: 'bold'}}>
              {isLoginMode ? '로그인' : '회원가입'}
            </Typography>
          </LoadingButton>
        </Card>
      </Stack>
    </Box>
  );
}
