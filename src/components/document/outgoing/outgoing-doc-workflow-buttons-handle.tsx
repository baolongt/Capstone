import CheckIcon from '@mui/icons-material/Check';
import DrawIcon from '@mui/icons-material/Draw';
import EmailIcon from '@mui/icons-material/Email';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReplayIcon from '@mui/icons-material/Replay';
import SchemaIcon from '@mui/icons-material/Schema';
import UndoIcon from '@mui/icons-material/Undo';
import { Box, IconButton, styled, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { OutgoingDocumentStatus } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { workFlow } from '@/models';

import EditButtonGroup from './outgoing-doc-detail-edit-button-group';

const ToolTipContent = ({ type }: { type: 'sign' | 'add-number' }) => {
  return (
    <>
      {type === 'sign' && (
        <>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Để thực hiện ký số bạn cần phải bật phần mềm ký số trên máy tính và
            kiểm tra ở mục file đính kèm đã kết nối với phần mềm ký số chưa?
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Để thêm số ở mục file đính kèm hãy bấm vào nút{' '}
            <IconButton color={'success'}>
              <DrawIcon />
            </IconButton>
          </Typography>
        </>
      )}

      {type === 'add-number' && (
        <>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Để thêm số ở mục file đính kèm hãy bấm vào nút{' '}
            <IconButton color={'primary'}>
              <DrawIcon />
            </IconButton>
          </Typography>
        </>
      )}

      <Box></Box>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextOnlyTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
))(`
color: black;
background-color: white;
font-size: 1em;
padding: 10px;
border: 1px solid black;
  `);

const isHandleCurrentStep = ({
  steps,
  userId
}: {
  steps: workFlow.Step[];
  userId: number;
}) => {
  const lastestPendingStep = steps.find(
    (step) => step.status === workFlow.Status.PENDING
  );
  if (!lastestPendingStep) return null;

  return {
    isHandle: lastestPendingStep.handlerId === userId,
    action: lastestPendingStep.action
  };
};

type WorkFlowButtonsHandleProps = {
  isLoadingWorkflow: boolean;
  setOpenWorkflowDiagram: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeStatus: () => void;
  handleRejecStep: () => void;
  handleRestartStep: () => void;
  handleWithdraw: () => void;
  steps: workFlow.Step[];
  createdById: number;
  docStatus: OutgoingDocumentStatus;
};

export const WorkFlowButtonsHandle = ({
  setOpenWorkflowDiagram,
  handleChangeStatus,
  handleRejecStep,
  handleRestartStep,
  handleWithdraw,
  steps,
  createdById,
  docStatus
}: WorkFlowButtonsHandleProps) => {
  const navigate = useNavigate();
  const {
    authState: { user }
  } = useAuth();
  if (!user) return null;

  const currentStep = isHandleCurrentStep({ steps, userId: user.id });
  const isCreatedByUser = user.id === createdById;

  const renderActionButton = (action: workFlow.Action) => {
    switch (action) {
      case workFlow.Action.CONSIDER:
        return (
          <Tooltip title="Đánh dấu đã xem xét">
            <IconButton color="primary" onClick={handleChangeStatus}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
        );
      case workFlow.Action.ADD_NUMNER:
        return (
          <>
            <TextOnlyTooltip title={<ToolTipContent type="add-number" />}>
              <IconButton color="primary">
                <PictureAsPdfIcon />
              </IconButton>
            </TextOnlyTooltip>
            <Tooltip title="Đánh dấu đã thêm số">
              <IconButton color="primary" onClick={handleChangeStatus}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      case workFlow.Action.PREPARE_EMAIL:
        return (
          <>
            <Tooltip title="Chuẩn bị email">
              <IconButton
                color="primary"
                onClick={() => navigate('prepare-email')}
              >
                <EmailIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Đánh dấu đã chuẩn bị email">
              <IconButton color="primary" onClick={handleChangeStatus}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      case workFlow.Action.SIGN:
        return (
          <>
            <TextOnlyTooltip title={<ToolTipContent type="sign" />}>
              <IconButton color="primary">
                <DrawIcon />
              </IconButton>
            </TextOnlyTooltip>
            <Tooltip title="Đánh dấu đã thực hiện ký">
              <IconButton color="primary" onClick={handleChangeStatus}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </>
        );
    }
  };

  return (
    <>
      <Tooltip title="Xem quy trình">
        <IconButton color="info" onClick={() => setOpenWorkflowDiagram(true)}>
          <SchemaIcon />
        </IconButton>
      </Tooltip>
      {isCreatedByUser && docStatus == OutgoingDocumentStatus.EDITING && (
        <>
          <EditButtonGroup />
          <Tooltip title="Bắt đầu lại quy trình">
            <IconButton color="primary" onClick={handleRestartStep}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      {isCreatedByUser && docStatus == OutgoingDocumentStatus.PENDING && (
        <Tooltip title="Thu hồi văn bản">
          <IconButton color="primary" onClick={handleWithdraw}>
            <RateReviewIcon />
          </IconButton>
        </Tooltip>
      )}
      {currentStep &&
        currentStep.isHandle &&
        docStatus == OutgoingDocumentStatus.PENDING && (
          <>
            {renderActionButton(currentStep.action)}
            <Tooltip title="Trả lại">
              <IconButton color="error" onClick={handleRejecStep}>
                <UndoIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
    </>
  );
};
