import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FailurePage({ setFailureDialogOpen }) {
  const navigate = useNavigate();

  useEffect(() => {
    setFailureDialogOpen(true);
    return () => navigate('/');
  }, [setFailureDialogOpen, navigate]);

  return null;
}