import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CldImage from '../cld-image';
import Iconify from '../../../components/iconify';
import LoadingProgress from '../../../components/loading-progress';

export default function AlbumView() {
  const [photos, setPhotos] = useState({});
  const [isLoading, setIsLoading] = useState(true);     // photo list loading
  const [loaded, setLoaded] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const getData = async (tag) => {
    const response = await fetch(
      `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/list/${tag}.json`
    );
    const data = await response.json();
    setPhotos(data);
    setIsLoading(false);
    // console.log(data);
  }
  const processResults = (error, result) => {
    if (result.event === 'close') {
      setIsDisabled(false);
    }
    if (result && result.event === 'success') {
      const secureUrl = result.info.secure_url;
      console.log(secureUrl);
      // const previewUrl = secureUrl.replace('/upload/', '/upload/w_400/f_auto,q_auto/');
      const previewUrl = secureUrl.replace('/upload/', '/upload/c_thumb,g_auto,h_500,w_500/f_auto/q_auto/');
      setUploadedImages((prevImages) => [...prevImages, previewUrl]);
      setIsDisabled(false);
    }
    if (error) {
      setIsDisabled(false);
    }
  };
  const uploadWidget = () => {
    setIsDisabled(true);
    window.cloudinary.openUploadWidget({
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME, 
        uploadPreset: process.env.REACT_APP_CLOUDINARY_PRESET,
        sources: ['local', 'url'],
        tags: ['myphotoalbum-react'],
        clientAllowedFormats: ['image'],
        resourceType: 'image',
      },
      processResults
    );
  };
  
  useEffect(() => {
    setUploadedImages([]);
    getData('myphotoalbum-react');
  }, []);
  useEffect(() => {
    const uwScript = document.getElementById('uw');
    if (!loaded && !uwScript) {
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('id', 'uw');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.addEventListener('load', () => setLoaded(true));
      document.body.appendChild(script);
    }
  }, [loaded]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Cloudinary Photo Album</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={uploadWidget} disabled={isDisabled}>
          New Photo
        </Button>
      </Stack>

      {isLoading && <LoadingProgress />}
      {!isLoading && photos.length !== 0 && (
        <Grid container spacing={3}>
          {uploadedImages.length !== 0 && (
            <>
            {uploadedImages.map((uploadedImage, idx) => (
              <Grid key={idx} xs={12} sm={6} md={4} lg={3}>
                <img src={uploadedImage} alt='uploaded' style={{maxWidth: '100%', borderRadius: '5%'}} />
              </Grid> 
            ))}
            </>
          )}
          {photos.resources.map((photo) => (
            <Grid key={photo.public_id} xs={12} sm={6} md={4} lg={3}>
              <CldImage publicId={photo.public_id} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}