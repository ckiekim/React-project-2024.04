import { useEffect } from 'react';

import { alpha } from '@mui/material/styles';
// import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { usePathname } from '../../routes/hooks';
import { RouterLink } from '../../routes/components';
import { useResponsive } from '../../hooks/use-responsive';
// import { account } from '../../_mock/account';
import Logo from '../../components/logo';
import Scrollbar from '../../components/scrollbar';
import { NAV } from './config-layout';
import navConfig from './config-navigation';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item, idx) => (
        <>
          <NavItem key={item.title} item={item} />
          {(idx % 3 === 2) && <Divider />}
        </>
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{ height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column', },
      }}
    >
      <Logo sx={{ mt: 3, mb: 5, ml: 4 }} />
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box sx={{ flexShrink: { lg: 0 }, width: { lg: NAV.WIDTH }, }}>
      {upLg ? (
        <Box
          sx={{ height: 1, position: 'fixed', width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`, }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer open={openNav} onClose={onCloseNav}
          PaperProps={{ sx: { width: NAV.WIDTH, }, }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink} href={item.path} key={item.title}
      sx={{ minHeight: 44, borderRadius: 0.75, typography: 'body2',
        color: 'text.secondary', textTransform: 'capitalize', fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16), },
        }),
      }}
    >
      {/* <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box> */}
      <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
        <Iconify width={24} icon={item.icon} />
        <Typography variant='body2'>{item.title}</Typography>
      </Stack>
    </ListItemButton>
  );
}
