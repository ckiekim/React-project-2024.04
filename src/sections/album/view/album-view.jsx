import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Iconify from '../../../components/iconify';
import CldImage from '../cld-image';

export default function AlbumView() {
  const [photos, setPhotos] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const getData = async (tag) => {
    const response = await fetch(
      `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/list/${tag}.json`
    );
    const data = await response.json();
    setPhotos(data);
    setIsLoading(false);
  }
  useEffect(() => {
    getData('my-photo-album-react');
  }, []);
  const handleClickOpen = () => { };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Photo Album</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleClickOpen}>
          New Photo
        </Button>
      </Stack>

      {isLoading && <p>로딩중...</p>}
      {photos && photos.length !== 0 ? (
        {photos.resources.map((photo, idx) =>  (
          <CldImage publicId={photo.public_id} />
        ))}
      ) : (
        <Typography>
          No photos to list. Please make sure that you have uploaded some images using this app.
        </Typography>
      )}
    </Container>
  );
}