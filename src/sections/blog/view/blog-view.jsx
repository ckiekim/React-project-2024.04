import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import { posts } from '../../../_mock/blog';
import useBlogs from '../useBlogs';
import Iconify from '../../../components/iconify';
import useUserInfo from '../../userInfo/useUserInfo';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';
import PostInsertForm from '../post-insert-form';

// ----------------------------------------------------------------------

export default function BlogView() {
  const { getList: {isLoading, data: posts} } = useBlogs();
  const { getRecord: { data: account } } = useUserInfo({ uid: sessionStorage.getItem('sessionUid') });

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">블로그</Typography>
        {account &&  <PostInsertForm account={account} />}
      </Stack>

      {isLoading && <p>로딩중...</p>}
      {posts && <>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <PostSearch posts={posts} />
          <PostSort
            options={[
              { value: 'latest', label: 'Latest' },
              { value: 'popular', label: 'Popular' },
              { value: 'oldest', label: 'Oldest' },
            ]}
          />
        </Stack>

        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </>}
    </Container>
  );
}
