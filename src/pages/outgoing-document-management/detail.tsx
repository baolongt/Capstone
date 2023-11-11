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
import { toast } from 'react-toastify';

import { send } from '@/apis';
import { useGetOneDocument } from '@/apis/outgoingDocument/getOneDocument';
import {
  useChangeStatus,
  useGetWorkFlows,
  WorkFlowDocType,
  WorkFlowStatus
} from '@/apis/work-flow';
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
import { Attachment, workFlow } from '@/models';
import { OutgoingPublishInfo } from '@/models/outgoingDocument';

const getLastestPendingStep = (steps: workFlow.Step[] = []) => {
  const lastestPendingStep = steps.find(
    (step) => step.status === workFlow.Status.PENDING
  );
  return lastestPendingStep;
};

const ButtonHandlerLabel = (action: workFlow.Action) => {
  switch (action) {
    case workFlow.Action.CONSIDER:
      return 'Chuyển';
    case workFlow.Action.ADD_NUMNER:
      return 'Thêm số';
    case workFlow.Action.PREPARE_EMAIL:
      return 'Chuẩn bị email';
    case workFlow.Action.SIGN:
      return 'Ký';
  }
};

const WorkFlowButtonsHandle = ({
  isLoadingWorkflow,
  setOpenWorkflowDiagram,
  handleChangeStatus,
  handleRejecStep,
  steps
}: {
  isLoadingWorkflow: boolean;
  setOpenWorkflowDiagram: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeStatus: () => void;
  handleRejecStep: () => void;
  steps: workFlow.Step[];
}) => {
  const currentStep = getLastestPendingStep(steps);
  console.log('currentStep', currentStep);

  return (
    <>
      <LoadingButton
        variant="outlined"
        color="primary"
        loading={isLoadingWorkflow}
        onClick={() => setOpenWorkflowDiagram(true)}
      >
        Xem quy trình
      </LoadingButton>
      {currentStep && (
        <>
          <LoadingButton
            variant="outlined"
            loading={isLoadingWorkflow}
            onClick={handleChangeStatus}
          >
            {ButtonHandlerLabel(currentStep.action)}
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            color="error"
            loading={isLoadingWorkflow}
            onClick={handleRejecStep}
          >
            Trả lại
          </LoadingButton>
        </>
      )}
    </>
  );
};

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

  React.useEffect(() => {
    if (data) {
      if (data.registrationStatus === 1) {
        navigate('/outgoing-documents/create?step=2&&id=' + data.id);
      } else if (data.registrationStatus === 2) {
        navigate('/outgoing-documents/create?step=3&&id=' + data.id);
      }

      console.log('data', data);
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
    send(attachmentId);
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
              variant="outlined"
              color="info"
              onClick={() => setOpenShareList(true)}
            />
            {/* {newestStatus === OutgoingDocumentStatus.CHO_CHINH_SUA && (
              <CustomButton
                label="Chỉnh sửa"
                onClick={() => navigate('edit')}
              />
            )} */}

            {workflow && (
              <WorkFlowButtonsHandle
                steps={workflow.steps}
                isLoadingWorkflow={isLoadingWorkflow}
                setOpenWorkflowDiagram={setOpenWorkflowDiagram}
                handleChangeStatus={handleChangeStatus}
                handleRejecStep={handleRejecStep}
              />
            )}
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
