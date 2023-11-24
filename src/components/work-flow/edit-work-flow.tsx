import { Box, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useEditWorkflow, useListHandlers } from '@/apis/work-flow';
import { DEFAULT_PAGE_WIDTH } from '@/constants';
import { workFlow } from '@/models';
import { DocumentTypeCreate } from '@/models/work-flow';

import { Loading } from '../common';
import DragAndDropList from './drag-and-drop-list';

type EditWorkFlowProps = {
  docId?: number;
  initWorkflow?: workFlow.Step[];
  workflowId?: number;
};

export const EditWorkFlow = ({
  workflowId,
  docId,
  initWorkflow
}: EditWorkFlowProps) => {
  const { data, isLoading } = useListHandlers();
  const location = useLocation();
  const users = data || [];

  let docType: DocumentTypeCreate | undefined;
  if (location.pathname.includes('outgoing')) {
    docType = DocumentTypeCreate.OUTGOING;
  }
  if (location.pathname.includes('internal')) {
    docType = DocumentTypeCreate.INTERNAL;
  }
  if (location.pathname.includes('incoming')) {
    docType = DocumentTypeCreate.INCOMING;
  }

  const { mutate: updateWorkflow, isLoading: isUpdatingWorkflow } =
    useEditWorkflow({
      onSuccess: () => {
        toast.success('Cập nhật trình tự xử lý thành công');
      },
      onError: () => {
        toast.error('Cập nhật trình tự xử lý thất bại');
      },
      docId: docId || -1,
      docType
    });

  const handleUpdate = (steps: workFlow.StepCreate[]) => {
    if (docId && workflowId) {
      updateWorkflow({
        workflowId,
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
        handleCreate={handleUpdate}
        isCreating={isUpdatingWorkflow}
        initData={initWorkflow}
        docType={docType as DocumentTypeCreate}
      />
    </Box>
  );
};
