import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import SchemaIcon from '@mui/icons-material/Schema';
import UndoIcon from '@mui/icons-material/Undo';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { OutgoingDocumentStatus } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { workFlow } from '@/models';

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
  steps: workFlow.Step[];
  createdById: number;
  docStatus: OutgoingDocumentStatus;
};

export const WorkFlowButtonsHandle = ({
  setOpenWorkflowDiagram,
  handleChangeStatus,
  handleRejecStep,
  handleRestartStep,
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
      case workFlow.Action.INTERNAL_SEND_TO_HEAD_OFFFICE:
        return (
          <Tooltip title="Đánh dấu đã xem xét">
            <IconButton color="primary" onClick={handleChangeStatus}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
        );
      case workFlow.Action.INTERNAL_SEND_TO_LEADER:
        return (
          <Tooltip title="Đánh dấu đã xem xét">
            <IconButton color="primary" onClick={handleChangeStatus}>
              <CheckIcon />
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
      {isCreatedByUser && docStatus == OutgoingDocumentStatus.EDITING && (
        <>
          <Tooltip title="Chỉnh sửa">
            <IconButton
              color="info"
              id="basic-button"
              onClick={() => {
                navigate('edit');
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bắt đầu lại quy trình">
            <IconButton color="primary" onClick={handleRestartStep}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>
        </>
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
