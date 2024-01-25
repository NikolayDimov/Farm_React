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

import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export default function AuthGuard() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use an effect to set loading to false once the authentication status is determined
    setLoading(false);
  }, [isAuthenticated]);

  if (loading) {
    // Render a loading indicator or placeholder while authentication status is being determined
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
