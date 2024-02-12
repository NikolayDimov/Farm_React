import Navbar from './Navbar';
import { Outlet } from 'react-router';

const WithNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default WithNavbar;