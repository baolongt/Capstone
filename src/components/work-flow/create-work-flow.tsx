import { Box, Paper } from '@mui/material';
import { toast } from 'react-toastify';

import { useCreateWorkflow, useListHandlers } from '@/apis/work-flow';
import { DEFAULT_PAGE_WIDTH } from '@/constants';
import { workFlow } from '@/models';
import { DocumentTypeCreate } from '@/models/work-flow';

import { Loading } from '../common';
import DragAndDropList from './drag-and-drop-list';

type CreateWorkFlowProps = {
  docId?: number;
  handleNextStep: () => void;
  docType: DocumentTypeCreate;
};
export const CreateWorkFlow = ({
  docId,
  docType,
  handleNextStep
}: CreateWorkFlowProps) => {
  const { data, isLoading } = useListHandlers();
  const users = data || [];

  const { mutate: createWorkflow, isLoading: isCreatingWorkflow } =
    useCreateWorkflow({
      onSuccess: () => {
        toast.success('Tạo trình tự xử lý thành công');
        handleNextStep();
      },
      onError: () => {
        toast.error('Tạo trình tự xử lý thất bại');
      },
      id: docId ?? -1,
      docType
    });

  const handleCreate = (steps: workFlow.StepCreate[]) => {
    if (docId) {
      createWorkflow({
        docId,
        docType,
        steps: steps.map((step, index) => ({
          handlerId: step.handlerId,
          action: step.action,
          stepNumber: index + 1
        }))
      });
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Box
      component={Paper}
      sx={{
        mx: 'auto',
        px: 5,
        pt: 1,
        height: '90vh',
        width: DEFAULT_PAGE_WIDTH
      }}
    >
      <DragAndDropList
        sx={{
          height: '80%',
          maxHeight: '80%',
          overflowY: 'auto',
          backgroundColor: '#EBECF0',
          pt: 1,
          px: 1
        }}
        users={users}
        handleCreate={handleCreate}
        isCreatingWorkflow={isCreatingWorkflow}
        isCreating={isCreatingWorkflow}
        docType={docType}
      />
    </Box>
  );
};
