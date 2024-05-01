// import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import { useResponsive } from '../../hooks/use-responsive';
import { bgBlur } from '../../theme/css';
import Iconify from '../../components/iconify';
import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import LanguagePopover from './common/language-popover';
import NotificationsPopover from './common/notifications-popover';
// import UserInfoInsertDialog from './common/userInfo-insert-dialog';
import { useAuthContext } from '../../context/AuthContext';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  const { user, logout } = useAuthContext();

  // 타이밍 문제 발생
  // 사용자 정보를 등록하는 다이얼로그를 띄우기 전에
  // 새로이 사용자 정보(uid, email)를 가져와야 하는데 안됨

  // const [userInfoOpen, setUserInfoOpen] = useState(false);
  // const [newUser, setNewUser] = useState();
  // const [userInfo, setUserInfo] = useState(null);

  // useEffect(() => {
  //   if (user && userInfoOpen) {
  //     setUserInfo({uid: user.uid, email: user.email});
  //     console.log(userInfoOpen);
  //     console.log(userInfo);
  //   }
  // }, [user]);
  // useEffect(() => {
  //   if (!userInfoOpen)
  //     setUserInfo(null);
  // }, [userInfoOpen]);
  // useEffect(() => {
  //   if (user) {
  //     console.log(user.email, user.uid);
  //     setNewUser(user);
  //     console.log(newUser);
  //   }
  // }, [user]);
  // useEffect(() => {
  //   if (userInfoOpen && newUser)
  //     setNewUser(null);
  // }, [userInfoOpen]);
  // useEffect(() => {
  //   if (!userInfoOpen)
  //     setNewUser(null);
  // }, [userInfoOpen]);

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}
      <Searchbar />
      <Box sx={{ flexGrow: 1 }} />
      <Stack direction="row" alignItems="center" spacing={1}>
        <LanguagePopover />
        <NotificationsPopover />
        <AccountPopover user={user} logout={logout} />
        {/* <AccountPopover callback={setUserInfoOpen} user={user} logout={logout} /> */}
        {/* {userInfo && 
              <UserInfoInsertDialog userInfoOpen={userInfoOpen} callback={setUserInfoOpen} 
                uInfo={userInfo} />} */}
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar sx={{ height: 1, px: { lg: 5 }, }}>
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
