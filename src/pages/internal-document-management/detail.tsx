import PostAddIcon from '@mui/icons-material/PostAdd';
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  send,
  useChangeStatus,
  useGetWorkFlows,
  useWithdraw,
  WorkFlowDocType,
  WorkFlowStatus
} from '@/apis';
import { useListDocumentFields } from '@/apis/documentType/listDocumentFields';
import { DocTypeEnum } from '@/apis/file/addDocToFile';
import { useGetOneDocument } from '@/apis/internalDocument/getOneDocument';
import { useRestartStatus } from '@/apis/work-flow/restart';
import { Loading } from '@/components/common';
import AppDocViewer from '@/components/common/document-viewer';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import {
  AddDocToFileDialog,
  WorkflowDiagramDialog
} from '@/components/dialogs';
import { DetailAttachmentAccordion } from '@/components/document';
import DocComment from '@/components/document/comment';
import {
  DetailDescription,
  DetailTimeline
} from '@/components/document/internal';
import { WorkFlowButtonsHandle } from '@/components/document/internal/internal-doc-workflow-buttons-handle';
import { Attachment } from '@/models';
import { DocumentType } from '@/models/comment';

const InternalDocumentDetail = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOneDocument(id ? parseInt(id) : -1);
  const [docPreview, setDocPreview] = React.useState(false);
  const [docPreviewData, setDocPreviewData] = React.useState<{ uri: string }[]>(
    []
  );
  const [openWorkflowDiagram, setOpenWorkflowDiagram] = React.useState(false);
  const [openAddDocToFile, setOpenAddDocToFile] = React.useState(false);
  const { data: workflow, isLoading: isLoadingWorkflow } = useGetWorkFlows({
    docId: id ? parseInt(id) : -1,
    docType: WorkFlowDocType.INTERNAL
  });
  const navigate = useNavigate();

  const { data: fields } = useListDocumentFields();

  const { mutate: changeStatus } = useChangeStatus({
    id: id ? parseInt(id) : -1,
    onSuccess: () => {
      toast.success('Chuyển  thành công');
    },
    onError: () => {
      toast.error('Chuyển thất bại');
    },
    type: WorkFlowDocType.INTERNAL
  });
  const { mutate: restartStep } = useRestartStatus({
    id: id ? parseInt(id) : -1,
    onSuccess: () => {
      toast.success('Bắt đầu lại quy trình thành công');
    },
    onError: () => {
      toast.error('Bắt đầu lại quy trình thất bại');
    },
    type: WorkFlowDocType.INTERNAL
  });
  const { mutate: withdrawDoc } = useWithdraw({
    id: id ? parseInt(id) : -1,
    onSuccess: () => {
      toast.success('Thu hồi văn bản thành công');
    },
    onError: () => {
      toast.error('Thu hồi văn bản thất bại');
    },
    type: WorkFlowDocType.OUTGOING
  });

  React.useEffect(() => {
    if (data) {
      if (data.registrationStatus === 1) {
        navigate('/internal-documents/create?step=2&&id=' + data.id);
      }
    }
  }, [data, navigate]);

  if (isLoading) {
    return <Loading />;
  }
  if (!data) {
    return <div>Not found</div>;
  }

  const handleOpenAddDocToFile = () => {
    setOpenAddDocToFile(true);
  };

  const handleCloseAddDocToFile = () => {
    setOpenAddDocToFile(false);
  };

  const handleClosePeview = () => {
    setDocPreview(false);
  };

  const watchAttachment = (url: string) => {
    setDocPreviewData([{ uri: url }]);
    setDocPreview(true);
  };

  const handleChangeStatus = () => {
    if (id) {
      changeStatus({
        id: id,
        status: WorkFlowStatus.APPROVED,
        docType: WorkFlowDocType.INTERNAL
      });
    }
  };

  const handleRejecStep = () => {
    if (id) {
      changeStatus({
        id: id,
        status: WorkFlowStatus.REJECTED,
        docType: WorkFlowDocType.INTERNAL
      });
    }
  };

  const handleRestartStep = () => {
    if (id) {
      restartStep({
        id: id,
        docType: WorkFlowDocType.INTERNAL
      });
    }
  };

  const handleWithdraw = () => {
    if (id) {
      withdrawDoc({
        id: parseInt(id),
        docType: WorkFlowDocType.OUTGOING
      });
    }
  };

  const handleAddNumber = async (attachmentId: string, url: string) => {
    navigate(`add-number?attachmentId=${attachmentId}&url=${url}`);
  };

  const signAttachment = async (attachmentId: string) => {
    send(attachmentId);
  };

  return (
    <>
      <Box>
        <PageHeader>
          <Box>
            <PageTitle label="thông tin văn bản" />
          </Box>
          <Stack
            spacing={{ xs: 1 }}
            direction="row"
            sx={{
              mt: 1
            }}
          >
            <Tooltip title="Thêm vào sổ công việc">
              <IconButton color="info" onClick={handleOpenAddDocToFile}>
                <PostAddIcon />
              </IconButton>
            </Tooltip>
            {workflow && (
              <WorkFlowButtonsHandle
                handleWithdraw={handleWithdraw}
                createdById={data.createdById}
                steps={workflow.steps}
                isLoadingWorkflow={isLoadingWorkflow}
                setOpenWorkflowDiagram={setOpenWorkflowDiagram}
                handleChangeStatus={handleChangeStatus}
                handleRejecStep={handleRejecStep}
                handleRestartStep={handleRestartStep}
                docStatus={data.documentStatus}
              />
            )}
          </Stack>
        </PageHeader>
        <Box
          sx={{
            mx: 'auto',
            width: '1080px',
            mt: 3,
            px: 2,
            pb: 3,
            minHeight: '90vh'
          }}
          component={Paper}
        >
          <DetailDescription
            data={{
              ...data,
              documentField:
                fields?.filter((f) => f.id.toString() == data.documentField)[0]
                  .field ?? ''
            }}
            sx={{ width: '100%' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <DetailTimeline
              sx={{
                p: 2,
                mt: 2,
                overflow: 'auto',
                maxHeight: '40vh',
                width: '45%',
                py: 3
              }}
              processHistory={data.processHistory}
            />
            <DetailAttachmentAccordion
              attachments={data.attachments as Attachment[]}
              watchAttachment={watchAttachment}
              signAttachment={signAttachment}
              addNumber={handleAddNumber}
              sx={{
                p: 2,
                mt: 2,
                overflow: 'auto',
                maxHeight: '40vh',
                width: '50%'
              }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="h6"
            sx={{ color: theme.palette.secondary.dark, mb: 2 }}
          >
            Bình luận
          </Typography>
          <DocComment
            sx={{ width: '100%', mb: 3 }}
            docId={Number(id)}
            documentType={DocumentType.INTERNAL}
          />
        </Box>
      </Box>
      {workflow && workflow?.steps && (
        <>
          <WorkflowDiagramDialog
            steps={workflow.steps}
            isOpen={openWorkflowDiagram}
            onClose={() => setOpenWorkflowDiagram(false)}
          />
        </>
      )}
      <AppDocViewer
        docs={docPreviewData}
        open={docPreview}
        handleClose={handleClosePeview}
      />
      <AddDocToFileDialog
        docType={DocTypeEnum.INTERNAL}
        isOpen={openAddDocToFile}
        onClose={handleCloseAddDocToFile}
      />
    </>
  );
};

export default InternalDocumentDetail;
