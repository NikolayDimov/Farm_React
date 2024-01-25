import React from 'react';
import styled from 'styled-components';
import MapComponent from './FieldComponent/MapComponent';
import BlockList from './FieldComponent/FieldList';
import SoilComponent from './SoilComponent/SoilComponent';
import Layout from '../common/Layout';
import MachineComponent from './MachineComponent/MachineComponent';
import servicePageImage from "../../../public/nivaSand.jpg"; 



const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${servicePageImage}); 
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  z-index: -1;
`;

const Window = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  background-color: rgba(255, 255, 255, 0.8);  
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);  
`;

const ServicePage: React.FC = () => {
  return (
    <Layout>
      <BackgroundImage />
      <Window>
        <MapComponent />
      </Window>
      <Window>
        <BlockList />
      </Window>
      <Window>
        <SoilComponent />
      </Window>
      <Window>
        <MachineComponent />
      </Window>
    </Layout>
  );
};

export default ServicePage;
