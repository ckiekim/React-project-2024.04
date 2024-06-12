import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { alpha } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import LoginDialog from './login-dialog';
import UserInfoInsertDialog from './userInfo-insert-dialog';
// import { account } from '../../../_mock/account';
import useUserInfo from '../../../hooks/useUserInfo';
import getWeatherByCoordinates from '../../../api/open-weather';

export default function AccountPopover({ user, logout }) {
  const [open, setOpen] = useState(null);
  const [showAlert, setShowAlert] = useState(true);
  const [showWeather, setShowWeather] = useState(false);
  const [weather, setWeather] = useState();
  const { getRecord: { data: account } } = useUserInfo(user);
  const navigate = useNavigate();
  // 날씨의 설명은 화면 크기가 sm 이상에서만 보여줌
  const isSmUp = useMediaQuery(theme => theme.breakpoints.up('sm'));

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  }
  const handleClose = () => {
    setOpen(null);
  }
  const handleLogout = () => {
    setOpen(null);
    sessionStorage.clear();
    setShowWeather(false);
    logout();
    navigate('/');
  }
  const handleWeather = () => {
    updateWeather();
    setShowWeather(!showWeather);
    handleClose();
  }
  const updateWeather = () => {
    getWeatherByCoordinates()
      .then(weatherInfo => { setWeather(weatherInfo); })
      .catch(console.error);
  }
  useEffect(() => {
    if (account)
      return;
    setShowAlert(true);
  }, [account]);

  return (
    <>
      {!user && <LoginDialog />}
      {user && <>
        {account ? (
          <IconButton onClick={handleOpen}
            sx={{ width: 40, height: 40,
              background: (theme) => alpha(theme.palette.grey[500], 0.08),
              ...(open && {
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              }),
            }}
          >
            {/* Avatar 컴포넌트에 key prop을 추가하면 Avatar가 업데이트될 때마다 Avatar가 렌더링됨. */}
            <Avatar key={user.uid} src={account.avatarUrl} alt={account.displayName}
              sx={{ width: 36, height: 36,
                border: (theme) => `solid 2px ${theme.palette.background.default}`,
              }}
            >
              {account.displayName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        ) : (
          <Stack direction='row' spacing={1} alignItems='center'>
            {showAlert && 
              <Box
                sx={{
                  position: 'fixed', // Changed from 'absolute' to 'fixed'
                  top: 0, left: 0, width: '100%',
                  zIndex: 1000,   // 다른 컴포넌트에 우선해서 가장 상위에 보여줌
                  display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2,
                }}
              >
                <Alert severity="success" onClose={() => { setShowAlert(false); }}>
                  Settings를 눌러 사용자 정보를 입력하세요.
                </Alert>
              </Box>
            }
            {/* <Typography sx={{background: (theme) => alpha(theme.palette.grey[800], 0.9), p:0.5}}>
              Settings를 눌러 사용자 정보를 입력하세요. &gt;&gt;
            </Typography> */}
            <Stack sx={{background: (theme) => alpha(theme.palette.primary.main, 1)}}>
              <UserInfoInsertDialog callback={() => {}} />
            </Stack>
          </Stack>
        )}

        <Popover open={!!open} anchorEl={open} onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ p: 0, mt: 1, ml: 0.75, width: 200, }}
        >
          {account && 
            <Box sx={{ my: 1.5, px: 2 }}>
              <Typography variant="subtitle2" noWrap>
                {account.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {account.email}
              </Typography>
            </Box>
          }

          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem onClick={handleWeather}>날씨</MenuItem>
          <UserInfoInsertDialog callback={setOpen} />

          <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

          <MenuItem disableRipple disableTouchRipple
            onClick={handleLogout}
            sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
          >
            Logout
          </MenuItem>
        </Popover>
      </>}
      {showWeather && weather && 
        <Stack direction='row' alignItems='center'>
          <img src={weather.icon} alt={weather.description} />
          {isSmUp &&
            <Typography sx={{color: (theme) => alpha(theme.palette.grey[800], 0.9)}}>
              {weather.description},
            </Typography>
          }
          <Typography sx={{color: (theme) => alpha(theme.palette.grey[800], 0.9)}}>
            &nbsp;&nbsp;{weather.temp} ℃
          </Typography>
        </Stack>
      }
    </>
  );
}
