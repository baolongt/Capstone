/* eslint-disable react-hooks/exhaustive-deps */
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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

import { connect, send, setUserName } from '@/apis';
import { DocTypeEnum } from '@/apis/file/addDocToFile';
import { useGetOneDocument } from '@/apis/outgoingDocument/getOneDocument';
import {
  useChangeStatus,
  useGetWorkFlows,
  WorkFlowDocType,
  WorkFlowStatus
} from '@/apis/work-flow';
import { useRestartStatus } from '@/apis/work-flow/restart';
import { Loading } from '@/components/common';
import AppDocViewer from '@/components/common/document-viewer';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import {
  AddDocToFileDialog,
  WorkflowDiagramDialog
} from '@/components/dialogs';
import { ShareListDialog } from '@/components/dialogs/share-list-dialog';
import {
  DetailAttachmentAccordion,
  DetailDescription,
  DetailTimeline,
  PublishInfo,
  WorkFlowButtonsHandle
} from '@/components/document';
import DocComment from '@/components/document/comment';
import OutgoingDocComment from '@/components/document/outgoing/outgoing-doc-detail-comment';
import { api } from '@/constants';
import { Attachment } from '@/models';
import { DocumentType } from '@/models/comment';
import { OutgoingPublishInfo } from '@/models/outgoingDocument';

const OutgoingDocumentDetail = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOneDocument(id ? parseInt(id) : -1);
  const { data: workflow, isLoading: isLoadingWorkflow } = useGetWorkFlows({
    docId: id ? parseInt(id) : -1,
    docType: WorkFlowDocType.OUTGOING
  });
  const [docPreview, setDocPreview] = React.useState(false);
  const [docPreviewData, setDocPreviewData] = React.useState<{ uri: string }[]>(
    []
  );
  const [openAddDocToFile, setOpenAddDocToFile] = React.useState(false);
  const [openShareList, setOpenShareList] = React.useState(false);
  const [openWorkflowDiagram, setOpenWorkflowDiagram] = React.useState(false);
  const navigate = useNavigate();
  const { mutate: changeStatus } = useChangeStatus({
    id: id ? parseInt(id) : -1,
    onSuccess: () => {
      toast.success('Chuyển  thành công');
    },
    onError: () => {
      toast.error('Chuyển thất bại');
    },
    type: WorkFlowDocType.OUTGOING
  });
  const { mutate: restartStep } = useRestartStatus({
    id: id ? parseInt(id) : -1,
    onSuccess: () => {
      toast.success('Bắt đầu lại quy trình thành công');
    },
    onError: () => {
      toast.error('Bắt đầu lại quy trình thất bại');
    },
    type: WorkFlowDocType.OUTGOING
  });
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (data) {
      if (data.registrationStatus === 1) {
        navigate('/outgoing-documents/create?step=2&&id=' + data.id);
      } else if (data.registrationStatus === 2) {
        navigate('/outgoing-documents/create?step=3&&id=' + data.id);
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

  const handleChangeStatus = () => {
    if (id) {
      changeStatus({
        id: id,
        status: WorkFlowStatus.APPROVED,
        docType: WorkFlowDocType.OUTGOING
      });
    }
  };

  const handleRejecStep = () => {
    if (id) {
      changeStatus({
        id: id,
        status: WorkFlowStatus.REJECTED,
        docType: WorkFlowDocType.OUTGOING
      });
    }
  };

  const handleRestartStep = () => {
    if (id) {
      restartStep({
        id: id,
        docType: WorkFlowDocType.OUTGOING
      });
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
            <Tooltip title="Chia sẻ">
              <IconButton color="info" onClick={() => setOpenShareList(true)}>
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
            {/* <CustomButton label="Chia sẻ" variant="outlined" /> */}
            {/* {newestStatus === OutgoingDocumentStatus.CHO_CHINH_SUA && (
              <CustomButton
                label="Chỉnh sửa"
                onClick={() => navigate('edit')}
              />
            )} */}

            {workflow && (
              <WorkFlowButtonsHandle
                createdById={data.createdById}
                steps={workflow.steps}
                isLoadingWorkflow={isLoadingWorkflow}
                setOpenWorkflowDiagram={setOpenWorkflowDiagram}
                handleChangeStatus={handleChangeStatus}
                handleRejecStep={handleRejecStep}
                handleRestartStep={handleRestartStep}
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
          <DetailDescription sx={{ width: '100%' }} data={data} />
          {data.outgoingPublishInfo && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="h6"
                sx={{ color: theme.palette.secondary.dark, mb: 2 }}
              >
                Thông tin phát hành
              </Typography>
              <PublishInfo
                data={data.outgoingPublishInfo as OutgoingPublishInfo}
              />
            </>
          )}

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
            documentType={DocumentType.OUTGOING}
          />
        </Box>
      </Box>
      <AppDocViewer
        docs={docPreviewData}
        open={docPreview}
        handleClose={handleClosePeview}
      />
      <AddDocToFileDialog
        docType={DocTypeEnum.OUTGOING}
        isOpen={openAddDocToFile}
        onClose={handleCloseAddDocToFile}
      />
      {workflow && workflow?.steps && (
        <WorkflowDiagramDialog
          steps={workflow.steps}
          isOpen={openWorkflowDiagram}
          onClose={() => setOpenWorkflowDiagram(false)}
        />
      )}

      <ShareListDialog
        isOpen={openShareList}
        onClose={() => setOpenShareList(false)}
      />
    </>
  );
};

export default OutgoingDocumentDetail;
