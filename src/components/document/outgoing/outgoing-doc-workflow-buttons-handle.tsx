import { LoadingButton } from '@mui/lab';

import { workFlow } from '@/models';

const getLastestPendingStep = (steps: workFlow.Step[] = []) => {
  const lastestPendingStep = steps.find(
    (step) => step.status === workFlow.Status.PENDING
  );
  return lastestPendingStep;
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
  const currentStep = getLastestPendingStep(steps);
  const isNotRejected = !isHaveRejectedStep(steps);

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
      {currentStep && isNotRejected && (
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
