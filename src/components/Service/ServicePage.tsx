import React from 'react';
import MapComponent from './MapComponent';
import BlockList from './BlockList';
import SoilComponent from './SoilComponent/SoilComponent';
import Layout from '../common/Layout';
import MachineComponent from './MachineComponent/MachineComponent';



const ServicePage: React.FC = () => {
  

  return (
    <Layout>
      <MapComponent />
      <BlockList />
      <SoilComponent />
      <MachineComponent />
      
    </Layout>
  );
};

export default ServicePage;
