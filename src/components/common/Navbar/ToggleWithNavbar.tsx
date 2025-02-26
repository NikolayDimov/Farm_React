import Navbar from './Navbar';
import { Outlet } from 'react-router';
import { ContentWrapper, Layout, NavbarWrapper } from './ToggleWithNavbar.style';


const WithNavbar = () => {
  return (
    <Layout>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </Layout>
  );
};

export default WithNavbar;