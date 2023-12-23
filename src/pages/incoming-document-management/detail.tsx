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
import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  connect,
  send,
  setUserName,
  useChangeStatus,
  useGetWorkFlows,
  WorkFlowDocType,
  WorkFlowStatus
} from '@/apis';
import { DocTypeEnum } from '@/apis/file/addDocToFile';
import { useGetOneDocument } from '@/apis/incomingDocument/getOneDocument';
import { useRestartStatus } from '@/apis/work-flow/restart';
import { Loading } from '@/components/common';
import AppDocViewer from '@/components/common/document-viewer';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import {
  AddDocToFileDialog,
  WorkflowDiagramDialog
} from '@/components/dialogs';
import {
  DetailAttachmentAccordion,
  DetailDescription,
  DetailTimeline
} from '@/components/document';
import DocComment from '@/components/document/comment';
import { WorkFlowButtonsHandle } from '@/components/document/incoming/incoming-doc-workflow-buttons-handle';
import { api } from '@/constants';
import { Attachment } from '@/models';
import { DocumentType } from '@/models/comment';

const IncomingDocumentDetail = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOneDocument(id ? parseInt(id) : -1);
  const [docPreview, setDocPreview] = React.useState(false);
  const [docPreviewData, setDocPreviewData] = React.useState<{ uri: string }[]>(
    []
  );
  const { data: workflow, isLoading: isLoadingWorkflow } = useGetWorkFlows({
    docId: id ? parseInt(id) : -1,
    docType: WorkFlowDocType.INCOMING
  });

  const [openAddDocToFile, setOpenAddDocToFile] = React.useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openWorkflowDiagram, setOpenWorkflowDiagram] = React.useState(false);
  const { mutate: changeStatus } = useChangeStatus({
    id: id ? parseInt(id) : -1,
    onSuccess: () => {
      toast.success('Chuyển  thành công');
    },
    onError: () => {
      toast.error('Chuyển thất bại');
    },
    type: WorkFlowDocType.INCOMING
  });
  const { mutate: restartStep } = useRestartStatus({
    id: id ? parseInt(id) : -1,
    onSuccess: () => {
      toast.success('Bắt đầu lại quy trình thành công');
    },
    onError: () => {
      toast.error('Bắt đầu lại quy trình thất bại');
    },
    type: WorkFlowDocType.INCOMING
  });

  React.useEffect(() => {
    if (data) {
      if (data.registrationStatus === 1) {
        navigate('/incoming-documents/create?step=2&&id=' + data.id);
      }
    }
  }, [data]);

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
        docType: WorkFlowDocType.INCOMING
      });
    }
  };

  const handleRejecStep = () => {
    if (id) {
      changeStatus({
        id: id,
        status: WorkFlowStatus.REJECTED,
        docType: WorkFlowDocType.INCOMING
      });
    }
  };

  const handleRestartStep = () => {
    if (id) {
      restartStep({
        id: id,
        docType: WorkFlowDocType.INCOMING
      });
    }
  };

  const handleAddNumber = async (attachmentId: string, url: string) => {
    navigate(`add-number?attachmentId=${attachmentId}&url=${url}`);
  };

  const signAttachment = async (attachmentId: string) => {
    const isConnected = await connect();

    if (isConnected) {
      await setUserName('test');
      await send(attachmentId);
      queryClient.invalidateQueries({ queryKey: [api.OUTGOING_DOCUMENT, id] });
    } else {
      toast.error('Không thể kết nối đến thiết bị ký số');
    }
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
          sx={{ mx: 'auto', width: '1080px', mt: 3, px: 2, minHeight: '80vh' }}
          component={Paper}
        >
          <DetailDescription
            sx={{ width: '100%' }}
            data={{
              epitomize: data.epitomize,
              documentNotation: data.incomingPublishInfo.incomingNotation,
              documentField: data.documentField,
              documentTypeName: data.documentTypeName,
              createdByName: data.createdByName
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <DetailTimeline
              sx={{
                p: 2,
                mt: 2,
                overflow: 'auto',
                maxHeight: '40vh',
                width: '45%'
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
                width: '50%',
                py: 3
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
            documentType={DocumentType.INCOMING}
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
        isOpen={openAddDocToFile}
        docType={DocTypeEnum.INCOMING}
        onClose={handleCloseAddDocToFile}
      />
    </>
  );
};

export default IncomingDocumentDetail;
