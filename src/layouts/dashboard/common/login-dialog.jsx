import { useState } from 'react';

import { alpha, useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Iconify from '../../../components/iconify';
import { login, register } from '../../../api/firebase';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': { padding: theme.spacing(2), },
  '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

export default function LoginDialog() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({email: '', password: ''});
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); setIsLoginMode(true); };
  const handleChange = e => {
    setLoginInfo({...loginInfo, [e.target.name]: e.target.value});
  }
  const handleSubmit = e => {
    if (isLoginMode) {
      login(loginInfo); 
    } else {
      register(loginInfo); 
    }
  }
  const handleMode = () => { setIsLoginMode(!isLoginMode); }

  return (
    <>
      <Button onClick={handleClickOpen}>
        <Typography sx={{fontWeight: 'bold'}}>로그인</Typography>
      </Button>
      <BootstrapDialog open={open}
        onClose={handleClose} aria-labelledby="customized-dialog-title"
        >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="h4">
            CK World {isLoginMode ? '로그인' : '회원가입'}
          </Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8,
          color: (theme) => theme.palette.grey[500], }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' }, }}>
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

            {isLoginMode &&
              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <Link variant="subtitle2" underline="hover">
                  패스워드를 잊으셨나요?
                </Link>
              </Stack>
            }
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} variant="contained">
            {isLoginMode ? '로그인' : '회원가입'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}