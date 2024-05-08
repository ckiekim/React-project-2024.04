// import {v2 as cloudinary} from 'cloudinary';
// import {v4 as uuid} from 'uuid';
// const cloudinary = require('cloudinary').v2;
// const uuid = require('uuid').v4;

// cloudinary.config({ 
//   cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.REACT_APP_CLOUDINARY_API_KEY, 
//   api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET, 
// });

// export async function uploadImage(file) {
//   const data = new FormData();
//   data.append('file', file);
//   data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
//   return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
//       method: 'POST',
//       body: data,
//     })
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//       return data.url;
//     });
// }

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