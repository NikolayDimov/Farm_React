
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export default function AuthGuard() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}























// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from "../context/AuthContext";

// export default function AuthGuard() {
//     const isAuthenticated = useAuth();
//     const userHaveExpToken = isAuthenticated.isAuthenticated
//     console.log('IsAuthenticated:', isAuthenticated);

//     if (!userHaveExpToken) {
//         return <Navigate to="/login" />;
//     }

//     return <Outlet />;
// }
