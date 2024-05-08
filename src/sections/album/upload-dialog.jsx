import { useEffect, useState } from 'react';

export default function UploadDialog() {
  const [loaded, setLoaded] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  
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

  const processResults = (error, result) => {
    if (result.event === 'close') {
      setIsDisabled(false);
    }
    if (result && result.event === 'success') {
      const secureUrl = result.info.secure_url;
      const previewUrl = secureUrl.replace(
        '/upload/',
        '/upload/w_400/f_auto,q_auto/'
      );
      setUploadedImages((prevImages) => [...prevImages, previewUrl]);
      setIsDisabled(false);
    }
    if (error) {
      setIsDisabled(false);
    }
  }
}