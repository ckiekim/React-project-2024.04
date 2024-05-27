import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import useUserInfo from '../../userInfo/useUserInfo';
import BoardInsertDialog from '../board-insert-dialog';
import MyEditor from '../../../components/my-editor';

export default function BoardView() {
  const { getRecord: { data: account } } = useUserInfo({ uid: sessionStorage.getItem('sessionUid') });

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">게시판</Typography>
        {account &&  <BoardInsertDialog account={account} />}
      </Stack>

      <MyEditor />
    </Container>
  );
}