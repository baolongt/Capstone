import { LoadingButton } from '@mui/lab';

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

const isHaveRejectedStep = (steps: workFlow.Step[] = []) => {
  return steps.some((step) => step.status === workFlow.Status.REJECTED);
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

type WorkFlowButtonsHandleProps = {
  isLoadingWorkflow: boolean;
  setOpenWorkflowDiagram: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeStatus: () => void;
  handleRejecStep: () => void;
  steps: workFlow.Step[];
};

export const WorkFlowButtonsHandle = ({
  isLoadingWorkflow,
  setOpenWorkflowDiagram,
  handleChangeStatus,
  handleRejecStep,
  steps
}: WorkFlowButtonsHandleProps) => {
  const isNotRejected = !isHaveRejectedStep(steps);
  const {
    authState: { user }
  } = useAuth();
  if (!user) return null;

  const currentStep = isHandleCurrentStep({ steps, userId: user.id });

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
      {currentStep && currentStep.isHandle && isNotRejected && (
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
