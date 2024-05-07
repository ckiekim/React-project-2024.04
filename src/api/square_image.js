const propsReader = require('properties-reader');
const props = propsReader('../../.env.local');
const cloudinaryConfig = {
	cloudName: props.get('REACT_APP_CLOUDINARY_CLOUD_NAME'),
	apiKey: props.get('REACT_APP_CLOUDINARY_API_KEY'),
	apiSecret: props.get('REACT_APP_CLOUDINARY_API_SECRET'),
}

const cloudinary = require('cloudinary').v2;
const uuid = require('uuid').v4;

cloudinary.config({ 
  cloud_name: cloudinaryConfig.cloudName, 
  api_key: cloudinaryConfig.apiKey, 
  api_secret: cloudinaryConfig.apiSecret, 
});

// import {v2 as cloudinary} from 'cloudinary';
cloudinary.uploader.upload("https://images.unsplash.com/photo-1712673363487-4f5e529df0b3?w=500",
  { public_id: uuid() }, 
  function(error, result) {
		const url = cloudinary.url(result.public_id, {
			width: 300,
			height: 300,
			crop: 'fill'
		});
		console.log(url);
	});

// https://source.unsplash.com/random/300x300/?man
// https://source.unsplash.com/random/300x300/?woman