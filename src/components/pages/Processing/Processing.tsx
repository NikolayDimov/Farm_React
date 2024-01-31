import React, { useEffect, useState } from 'react';
import { Processing } from './Processing.static';
import { ProcessingType } from '../ProcessingType/ProcessingType.static';
import { Field } from '../Field/Field.static';
import { Crop } from '../Crop/Crop.static';
import { Machine } from '../Machine/Machine.static';
import { Farm } from '../Farm/Farm.static';
import { Soil } from '../Soil/Soil.static';
import ProcessingList from './ProcessingList';
import { GrowingCropPeriod } from '../GrowingCropPeriod/GrowingCropPeriod.static';
import AddProcessing from './AddProcessing';
import {
  ModalOverlay,
  StyledModalContainer,
  modalContentStyles,
  closeButtonStyles,
} from '../../BaseLayout/BaseLayout.style';
import { apiField } from '../../../services/apiField';
import { apiFarm } from '../../../services/apiFarm';
import { apiSoil } from '../../../services/apiSoil';
import { apiProcessing } from '../../../services/apiProcessing';
import { apiProcessingType } from '../../../services/apiProcessingType';
import { apiCrop } from '../../../services/apiCrop';
import { apiMachine } from '../../../services/apiMachine';
import { apiGrowingCropPeriod } from '../../../services/apiGrowingCropPeriod';


const ProcessingComponent: React.FC = () => {
  const [processings, setProcessings] = useState<Processing[]>([]);
  const [processingTypes, setProcessingTypes] = useState<ProcessingType[]>([]);
  const [growingCropPeriods, setGrowingCropPeriods] = useState<GrowingCropPeriod[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [soils, setSoils] = useState<Soil[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState(false); 

  const fetchProcessings = async () => {
    try {
      const processingsData = await apiProcessing.fetchProcessings();
      const processingTypesData = await apiProcessingType.fetchProcessingTypes();
      const growingCropPeriodsData = await apiGrowingCropPeriod.fetchGCP();
      const fieldsData = await apiField.fetchFields();
      const cropsData = await apiCrop.fetchCrops();
      const machinesData = await apiMachine.fetchMachines();
      const farmsData = await apiFarm.fetchFarms();
      const soilsData = await apiSoil.fetchSoils();


      setProcessings(processingsData.data); 
      setProcessingTypes(processingTypesData.data); 
      setGrowingCropPeriods(growingCropPeriodsData.data); 
      setFields(fieldsData.data); 
      setCrops(cropsData.data); 
      setMachines(machinesData.data); 
      setFarms(farmsData.data); 
      setSoils(soilsData.data); 
    } catch (error) {
      console.error('Error in fetching Processing', error);
    }
  };

  useEffect(() => {
    fetchProcessings(); 
  }, []);


  const showModal = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  useEffect(() => {
    if (modalVisible) {
      const timeoutId = setTimeout(() => {
        setModalVisible(false);
        setModalMessage('');
        setConfirmation(false); 
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [modalVisible]);


  const handleDeleteProcessing = async (processingId: string) => {
    try {
      setLoading(true);

      // Make API call to delete soil by ID
      const response = await apiProcessing.deleteProcessing(processingId);

      if (response.ok) {
        // Handle successful deletion
        setProcessings((prevProcessings) => prevProcessings.filter((processing) => processing.id !== processingId));
      } else {
        const responseBody = await response.json();
        console.error(`Failed to delete Processing with ID: ${processingId}`, responseBody);

        if (response.status === 400 && responseBody.error?.message) {
          showModal(responseBody.error.message);
          setConfirmation(true); 
        } else {
          showModal('Failed to delete Processing');
        }
      }
    } catch (error) {
      console.error('Error deleting Processing:', error);

      showModal('Failed to delete Processing');
    } finally {
      setLoading(false);
    }
  };
  

 
  return (
    <>
      <AddProcessing fetchProcessings={fetchProcessings} />
      <ProcessingList processings={processings} 
                      processingTypes={processingTypes} 
                      growingCropPeriods={growingCropPeriods} 
                      fields={fields} 
                      crops={crops} 
                      machines={machines}
                      farms={farms}
                      soils={soils} 
                      onDeleteProcessing={handleDeleteProcessing}
       /> 
          <ModalOverlay show={modalVisible} confirmation={false}>
        <StyledModalContainer confirmation={confirmation}>
          <div style={modalContentStyles}>
            {confirmation ? 'Processing cannot be deleted' : modalMessage}
          </div>
          <div style={closeButtonStyles}>
            <button onClick={() => setModalVisible(false)}>Close</button>
          </div>
        </StyledModalContainer>
      </ModalOverlay>
    </>
  );
};



export default ProcessingComponent;
