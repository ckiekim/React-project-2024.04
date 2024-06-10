export default class MyUploadAdapter {
	constructor(loader) {
		this.loader = loader;
		console.log('constructor()');
	}

	// Implement the upload function.
	upload() {
		console.log('upload()');
		return this.loader.file
			.then(file => new Promise((resolve, reject) => {
				const data = new FormData();
				data.append('file', file);
				data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

				fetch(process.env.REACT_APP_CLOUDINARY_URL, {
					method: 'POST',
					body: data
				})
				.then(response => response.json())
				.then(result => {
					resolve({
						default: result.url
					});
				})
				.catch(error => {
					reject(error);
				});
			}));
	}

	abort() {
		// Implement the abort function if necessary.
	}
}