import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import { posts } from '../../../_mock/blog';
import useBlogs from '../../../hooks/useBlogs'
import useUserInfo from '../../userInfo/useUserInfo';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';
import PostInsertDialog from '../post-insert-dialog';
import LoadingProgress from '../../../components/loading-progress';

// ----------------------------------------------------------------------

export default function BlogView() {
  const { getList: {isLoading, data: posts} } = useBlogs();
  const { getRecord: { data: account } } = useUserInfo({ uid: sessionStorage.getItem('sessionUid') });

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">블로그</Typography>
        {account &&  <PostInsertDialog account={account} />}
      </Stack>

      {isLoading && <LoadingProgress />}
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
