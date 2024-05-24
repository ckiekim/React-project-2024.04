import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage({ setDialogOpen }) {
  const navigate = useNavigate();

  useEffect(() => {
    setDialogOpen(true);
    return () => navigate('/products');
  }, [setDialogOpen, navigate]);

  return null;
}