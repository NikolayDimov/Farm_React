// ServicePage.tsx
import React from 'react';
import MapComponent from './MapComponent';
import BlockList from './BlockList';
import SoilComponent from './SoilComponent/SoilComponent';
import Layout from '../common/Layout';



const ServicePage: React.FC = () => {
  

  return (
    <Layout>
      <MapComponent />
      <BlockList />
      <SoilComponent />
      
    </Layout>
  );
};

export default ServicePage;
