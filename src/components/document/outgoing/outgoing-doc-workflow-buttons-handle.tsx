import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ReplayIcon from '@mui/icons-material/Replay';
import SchemaIcon from '@mui/icons-material/Schema';
import UndoIcon from '@mui/icons-material/Undo';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import { workFlow } from '@/models';

import EditButtonGroup from './outgoing-doc-detail-edit-button-group';

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

const isHaveRejectedStep = (steps: workFlow.Step[] = []) => {
  return steps.some((step) => step.status === workFlow.Status.REJECTED);
};

type WorkFlowButtonsHandleProps = {
  isLoadingWorkflow: boolean;
  setOpenWorkflowDiagram: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeStatus: () => void;
  handleRejecStep: () => void;
  handleRestartStep: () => void;
  steps: workFlow.Step[];
  createdById: number;
};

export const WorkFlowButtonsHandle = ({
  setOpenWorkflowDiagram,
  handleChangeStatus,
  handleRejecStep,
  handleRestartStep,
  steps,
  createdById
}: WorkFlowButtonsHandleProps) => {
  const navigate = useNavigate();
  const isNotRejected = !isHaveRejectedStep(steps);
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
          <Tooltip title="Thêm số vào file pdf">
            <IconButton color="primary" onClick={handleChangeStatus}>
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>
        );
      case workFlow.Action.PREPARE_EMAIL:
        return (
          <Tooltip title="Chuẩn bị email">
            <IconButton
              color="primary"
              onClick={() => navigate('prepare-email')}
            >
              <EmailIcon />
            </IconButton>
          </Tooltip>
        );
      case workFlow.Action.SIGN:
        return (
          <Tooltip title="Ký">
            <IconButton
              color="primary"
              onClick={() => navigate('prepare-email')}
            >
              <EmailIcon />
            </IconButton>
          </Tooltip>
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
      {!isNotRejected && isCreatedByUser && (
        <>
          <EditButtonGroup />
          <Tooltip title="Bắt đầu lại quy trình">
            <IconButton color="primary" onClick={handleRestartStep}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      {currentStep && currentStep.isHandle && isNotRejected && (
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
