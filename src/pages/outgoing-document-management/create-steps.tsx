import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseStepper from '@/components/common/stepper';
import { CreatePublishInfo } from '@/components/document/outgoing/outgoing-doc-create-publish-info';
import { CreateWorkFlow } from '@/components/work-flow/create-work-flow';

import CreateOutgoingDocumentPage from './create';

const createSteps = [
  { label: 'Tạo văn bản' },
  { label: 'Tạo trình tự xử lý' },
  {
    label: 'Thêm thông tin phát hành'
  }
];

const StepPage = ({
  step,
  handleNextStep
}: {
  step: number;
  handleNextStep: () => void;
}) => {
  const navigate = useNavigate();
  const [newDocId, setNewDocId] = useState<number>();
  const pages: {
    [key: number]: JSX.Element;
  } = {
    1: (
      <CreateOutgoingDocumentPage
        setNewDocId={setNewDocId}
        handleNextStep={handleNextStep}
      />
    ),
    2: <CreateWorkFlow handleNextStep={handleNextStep} docId={newDocId} />,
    3: (
      <CreatePublishInfo
        handleNextStep={() => {
          console.log('finish');
          navigate('/outgoing-documents');
        }}
        docId={newDocId}
      />
    )
  };

  return pages[step + 1];
};

const CreateStepsPage = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [steps, setSteps] = useState<any[]>(createSteps);

  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <>
      <BaseStepper sx={{ pt: 5 }} activeStep={activeStep} steps={steps} />
      <Box sx={{ mt: 1, maxHeight: '90vh' }}>
        {<StepPage handleNextStep={handleNextStep} step={activeStep} />}
      </Box>
      <Box sx={{ px: 25, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Quay lại
        </Button>
        <Button
          disabled={activeStep === steps.length}
          onClick={() => setActiveStep(activeStep + 1)}
        >
          Tiếp theo
        </Button>
      </Box>
    </>
  );
};

export default CreateStepsPage;
