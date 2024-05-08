export async function squareImage(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST',
      body: data,
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const squareUrl = data.url.replace('/upload/', '/upload/c_thumb,g_auto,h_500,w_500/f_auto/q_auto/');
      return squareUrl;
    });
}

export async function uploadImage(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST',
      body: data,
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      return data.url;
    });
}