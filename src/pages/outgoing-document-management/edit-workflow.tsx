import { Box, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useGetWorkFlows, WorkFlowDocType } from '@/apis';
import { Loading } from '@/components/common';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import { EditWorkFlow } from '@/components/work-flow';

const OutgoingDocEditWorkFlowPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: workflow, isLoading: isLoadingWorkflow } = useGetWorkFlows({
    docId: id ? parseInt(id) : -1,
    docType: WorkFlowDocType.OUTGOING
  });
  if (isLoadingWorkflow) return <Loading />;
  return (
    <>
      <Box>
        <PageHeader>
          <Box>
            <PageTitle label="Chỉnh sửa luồng xử lý" />
          </Box>
        </PageHeader>
        <Box
          sx={{
            mx: 'auto',
            width: '1080px',
            mt: 3,
            pt: 3,
            px: 2,
            minHeight: '80vh'
          }}
          component={Paper}
        >
          <EditWorkFlow docId={Number(id)} initWorkflow={workflow?.steps} />;
        </Box>
      </Box>
    </>
  );
};

export default OutgoingDocEditWorkFlowPage;
