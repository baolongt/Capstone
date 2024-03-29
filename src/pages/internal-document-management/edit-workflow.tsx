import { Box, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetWorkFlows, WorkFlowDocType } from '@/apis';
import { useGetOneDocument } from '@/apis/internalDocument/getOneDocument';
import { Loading } from '@/components/common';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import { EditWorkFlow } from '@/components/work-flow';
import { OutgoingDocumentStatus } from '@/constants';

const InternalDocEditWorkFlowPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetOneDocument(id ? parseInt(id) : -1);
  const navigate = useNavigate();
  const { data: workflow, isLoading: isLoadingWorkflow } = useGetWorkFlows({
    docId: id ? parseInt(id) : -1,
    docType: WorkFlowDocType.INTERNAL
  });
  if (isLoadingWorkflow) return <Loading />;

  if (data?.documentStatus != OutgoingDocumentStatus.EDITING)
    navigate('/internal-documents/' + id);

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
          <EditWorkFlow
            workflowId={workflow?.id}
            docId={Number(id)}
            initWorkflow={workflow?.steps}
          />
        </Box>
      </Box>
    </>
  );
};

export default InternalDocEditWorkFlowPage;
