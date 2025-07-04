import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard/overview');
  }, [navigate]);

  return null;
}
