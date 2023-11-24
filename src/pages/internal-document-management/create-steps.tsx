import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import BaseStepper from '@/components/common/stepper';
import { CreateWorkFlow } from '@/components/work-flow/create-work-flow';
import { DocumentTypeCreate } from '@/models/work-flow';

import CreateInternalDocumentPage from './create';

const createSteps = [{ label: 'Tạo văn bản' }, { label: 'Tạo trình tự xử lý' }];

const StepPage = ({
  step,
  docId,
  handleNextStep
}: {
  step: number;
  docId: string | null;
  handleNextStep: () => void;
}) => {
  const navigate = useNavigate();
  const [newDocId, setNewDocId] = useState<number>();
  useEffect(() => {
    if (docId) {
      setNewDocId(Number(docId));
    }
  }, [docId]);

  const pages: {
    [key: number]: JSX.Element;
  } = {
    1: (
      <CreateInternalDocumentPage
        setNewDocId={setNewDocId}
        handleNextStep={handleNextStep}
      />
    ),
    2: (
      <CreateWorkFlow
        handleNextStep={() => {
          navigate('/internal-documents');
        }}
        docId={newDocId}
        docType={DocumentTypeCreate.INTERNAL}
      />
    )
  };

  return pages[step + 1];
};

const InternalCreateStepsPage = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const step = queryParams.get('step');
  const docId = queryParams.get('id');
  const [steps] = useState<any[]>(createSteps);

  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  useEffect(() => {
    if (step && docId) {
      setActiveStep(Number(step) - 1);
    }
  }, [docId, step]);

  return (
    <>
      <BaseStepper sx={{ pt: 5 }} activeStep={activeStep} steps={steps} />
      <Box sx={{ mt: 1, maxHeight: '90vh' }}>
        {
          <StepPage
            handleNextStep={handleNextStep}
            step={activeStep}
            docId={docId}
          />
        }
      </Box>
    </>
  );
};

export default InternalCreateStepsPage;
