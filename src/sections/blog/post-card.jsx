import { useState } from 'react';

import { alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fDate } from '../../utils/format-time';
import { fShortenNumber } from '../../utils/format-number';

import Iconify from '../../components/iconify';
import SvgColor from '../../components/svg-color';
import useBlogs from '../../hooks/useBlogs';

// ----------------------------------------------------------------------

export default function PostCard({ post, index }) {
  const [comment, setComment] = useState(post.comment);
  const [view, setView] = useState(post.view);
  const [share, setShare] = useState(post.share);
  const { cover, title, author, createdAt } = post;
  const { updateRecord }  = useBlogs();
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const handleComment = () => { 
    updateRecord.mutate({...post, comment: comment+1, view: view+1});
    setComment(comment + 1); setView(view + 1);
  };
  const handleTitle = () => { 
    updateRecord.mutate({...post, view: view+1}); 
    setView(view + 1); 
  };
  const handleShare = () => { 
    updateRecord.mutate({...post, share: share+1, view: view+1}); 
    setShare(share + 1); setView(view + 1);
  };

  const renderAvatar = (
    <Avatar src={author.avatarUrl} alt={author.displayName}
      sx={{ zIndex: 9, width: 32, height: 32, position: 'absolute',
        left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
        ...((latestPostLarge || latestPost) && {
          zIndex: 9, top: 24, left: 24, width: 40, height: 40,
        }),
      }}
    />
  );

  const renderTitle = (
    <Link color="inherit" variant="subtitle2" underline="hover"
      sx={{ height: 44, overflow: 'hidden', WebkitLineClamp: 2, display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        ...(latestPostLarge && { typography: 'h5', height: 60 }),
        ...((latestPostLarge || latestPost) && { color: 'common.white', }),
      }}
      onClick={handleTitle}
    >
      {title}
    </Link>
  );

  const renderInfo = (
    <Stack direction="row" flexWrap="wrap" spacing={1.5} justifyContent="flex-end"
      sx={{ mt: 3, color: 'text.disabled', }} alignItems='center'
    >
      <Stack key='0' direction="row"
          sx={{ ...((latestPostLarge || latestPost) && { opacity: 0.48, color: 'common.white', }), }}
      >
        <Link onClick={handleComment} color="inherit" underline="none">
          <Iconify width={16} icon='eva:message-circle-fill' sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(comment)}</Typography>
        </Link>
      </Stack>

      <Stack key='1' direction="row"
          sx={{ ...((latestPostLarge || latestPost) && { opacity: 0.48, color: 'common.white', }), }}
      >
        <Link onClick={handleTitle} color="inherit" underline="none">
          <Iconify width={16} icon='eva:eye-fill' sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(view)}</Typography>
        </Link>
      </Stack>

      <Stack key='2' direction="row"
          sx={{ ...((latestPostLarge || latestPost) && { opacity: 0.48, color: 'common.white', }), }}
      >
        <Link onClick={handleShare} color="inherit" underline="none">
          <Iconify width={16} icon='eva:share-fill' sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(share)}</Typography>
        </Link>
      </Stack>
      {/* {[
        { number: comment, icon: 'eva:message-circle-fill' },
        { number: view, icon: 'eva:eye-fill' },
        { number: share, icon: 'eva:share-fill' },
      ].map((info, _index) => (
        <Stack key={_index} direction="row"
          sx={{ ...((latestPostLarge || latestPost) && {
              opacity: 0.48, color: 'common.white', }),
          }}
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
        </Stack>
      ))} */}
    </Stack>
  );

  const renderCover = (
    <Box component="img" 
      src={cover.startsWith('/') ? `${process.env.PUBLIC_URL}${cover}` : cover} 
      alt={title}
      sx={{ top: 0, width: 1, height: 1, objectFit: 'cover', position: 'absolute', }}
    />
  );

  const renderDate = (
    <Typography variant="caption" component="div"
      sx={{ mb: 2, color: 'text.disabled',
        ...((latestPostLarge || latestPost) && {
          opacity: 0.48, color: 'common.white', }),
      }}
    >
      {fDate(createdAt)}
    </Typography>
  );

  const renderShape = (
    <SvgColor color="paper" src="/assets/icons/shape-avatar.svg"
      sx={{ width: 80, height: 36, zIndex: 9, bottom: -15, position: 'absolute', color: 'background.paper',
        ...((latestPostLarge || latestPost) && { display: 'none' }),
      }}
    />
  );

  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card>
        <Box
          sx={{ position: 'relative', pt: 'calc(100% * 3 / 4)',
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0, content: "''", width: '100%', height: '100%', position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: { xs: 'calc(100% * 4 / 3)', sm: 'calc(100% * 3 / 4.66)', },
            }),
            "&:hover": {transform: 'scale(1.05)'}
          }}
        >
          {renderShape}
          {renderAvatar}
          {renderCover}
        </Box>

        <Box
          sx={{ p: (theme) => theme.spacing(4, 3, 3, 3),
            ...((latestPostLarge || latestPost) && {
              width: 1, bottom: 0, position: 'absolute',
            }),
          }}
        >
          {renderDate}
          {renderTitle}
          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}
