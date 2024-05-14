import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user)
      setIsLoading(false);
    else
      setIsLoading(false);  // 사용자가 로그인하지 않은 경우에도 로딩이 완료되었음을 설정해야 18번 코드가 실행이 됨.
  }, [user]);

  if (isLoading)
    return null;

  if (!user) {
    alert('먼저 로그인을 해 주세요.');
    return <Navigate to='/login' replace={true} />
  }

  if (requireAdmin && !user.isAdmin) {
    alert('관리자만 사용 가능한 메뉴입니다.');
    return <Navigate to='/' replace={true} />
  }

  return children;
}