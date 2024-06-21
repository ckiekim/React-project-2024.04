import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { changeTel } from './util';

export default function PhoneNumberInput({ tel, setTel }) {
	const regex = /^[0-9\b -]{0,13}$/;

  const handlePress = (e) => {
    if (regex.test(e.target.value)) {
      setTel(e.target.value);
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    if (regex.test(paste)) {
			const newTel = changeTel(paste);
      setTel(newTel);
    }
  };
  useEffect(() => {
    setTel(prevTel => changeTel(prevTel));
  }, [tel, setTel]);

	return (
		<TextField required 
			margin="dense" value={tel} 
			label="전화번호" 
			fullWidth
			onChange={handlePress} 
			onPaste={handlePaste}
			placeholder='숫자만 입력하세요' 
		/>
	)
}