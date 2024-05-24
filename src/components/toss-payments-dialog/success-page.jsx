import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessPage({ setSuccessDialogOpen }) {
  const navigate = useNavigate();

  useEffect(() => {
    setSuccessDialogOpen(true);
    return () => navigate('/');
  }, [setSuccessDialogOpen, navigate]);

  return null;
}