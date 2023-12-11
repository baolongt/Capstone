import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';

import { CustomButton } from '@/components/common';
import { Step, WorkFlowActionDict } from '@/models/work-flow';

interface RollbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  steps: Step[];
  handleRollbackStep: ({
    stepNumber,
    reason
  }: {
    stepNumber: number;
    reason: string;
  }) => void;
}

const RollbackDialog = ({
  steps,
  isOpen,
  onClose,
  handleRollbackStep
}: RollbackDialogProps) => {
  const [stepNumber, setStepNumber] = useState<number>();
  const [reason, setReason] = useState<string>('');

  const handleClose = () => {
    setStepNumber(-1);
    setReason('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h5">Quay lại</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          height: '200px'
        }}
      >
        <Autocomplete
          disablePortal
          size="small"
          options={steps.map((step) => {
            return {
              id: step.stepNumber,
              label:
                'Bước ' +
                step.stepNumber +
                ' - ' +
                step.handlerName +
                ' - ' +
                WorkFlowActionDict[step.action]
            };
          })}
          sx={{ width: 400, mb: 2, mt: 1 }}
          renderInput={(params) => <TextField {...params} label="Bước" />}
          onChange={(e, value) => {
            setStepNumber(value?.id);
          }}
        />
        <TextField
          multiline
          size="small"
          rows={4}
          maxRows={4}
          label="Lý do (tối đa 100 ký tự)"
          sx={{ width: '100%' }}
          onChange={(e) => {
            setReason(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy" variant="outlined" onClick={handleClose} />
        <LoadingButton
          disabled={reason.length === 0}
          variant="contained"
          size="small"
          onClick={() => {
            if (stepNumber) {
              handleRollbackStep({
                reason,
                stepNumber
              });
              handleClose();
            }
          }}
        >
          Quay lại bước
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default RollbackDialog;
