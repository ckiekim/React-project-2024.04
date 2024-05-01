import { useEffect, useState } from 'react';
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
import UserInfoInsertDialog from './common/userInfo-insert-dialog';
import { useAuthContext } from '../../context/AuthContext';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const [userInfoOpen, setUserInfoOpen] = useState(false);
  const [newUser, setNewUser] = useState();
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  const { user, logout } = useAuthContext();
  useEffect(() => {
    if (user) {
      setNewUser(user);
      console.log(user.email);
    }
  }, [user, userInfoOpen]);

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
        <AccountPopover callback={setUserInfoOpen} user={user} logout={logout} />
        {newUser && <UserInfoInsertDialog userInfoOpen={userInfoOpen} callback={setUserInfoOpen} user={newUser} />}
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
