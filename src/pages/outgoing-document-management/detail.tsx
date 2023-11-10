import { LoadingButton } from '@mui/lab';
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { send } from '@/apis';
import { useGetOneDocument } from '@/apis/outgoingDocument/getOneDocument';
import { useGetWorkFlows, WorkFlowDocType } from '@/apis/work-flow';
import { CustomButton, Loading } from '@/components/common';
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
  PublishInfo
} from '@/components/document';
import { OutgoingDocumentStatus } from '@/constants';
import { Attachment } from '@/models';
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
  const newestStatus = data?.processHistory?.[0].status;
  const navigate = useNavigate();

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
            <CustomButton
              label="Thêm vào sổ công việc"
              onClick={handleOpenAddDocToFile}
            />
            <CustomButton
              label="Chia sẻ"
              onClick={() => setOpenShareList(true)}
            />
            {newestStatus === OutgoingDocumentStatus.CHO_CHINH_SUA && (
              <CustomButton
                label="Chỉnh sửa"
                onClick={() => navigate('edit')}
              />
            )}

            <LoadingButton
              variant="contained"
              loading={isLoadingWorkflow}
              onClick={() => setOpenWorkflowDiagram(true)}
            >
              Xem quy trình
            </LoadingButton>
            <LoadingButton variant="outlined" loading={isLoadingWorkflow}>
              Chuyển tiếp
            </LoadingButton>
          </Stack>
        </PageHeader>
        <Box
          sx={{ mx: 'auto', width: '1080px', mt: 3, px: 2, minHeight: '80vh' }}
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
          <DetailAttachmentAccordion
            attachments={data.attachments as Attachment[]}
            watchAttachment={watchAttachment}
            signAttachment={signAttachment}
            addNumber={handleAddNumber}
            sx={{ mt: 2 }}
          />

          <DetailTimeline sx={{ mt: 2 }} processHistory={data.processHistory} />
        </Box>
      </Box>
      <AppDocViewer
        docs={docPreviewData}
        open={docPreview}
        handleClose={handleClosePeview}
      />
      <AddDocToFileDialog
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
