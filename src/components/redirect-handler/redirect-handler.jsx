import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RedirectHandler() {
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const redirectPath = params.get('path');
		// const time = new Date().toISOString().substring(0,19).replace('T', ' ');
		// localStorage.setItem('redirect:' + time, redirectPath);
		if (redirectPath) {
			const correctedPath = redirectPath.startsWith('/ck-react-world') ? 
				redirectPath.substring('/ck-react-world'.length) : redirectPath;
			navigate(correctedPath);
		}
	}, [navigate]);

	return null;
}