import { Dialog, DialogContent } from '@mui/material';
import React from 'react';

import BaseVerticalStepper from '../common/stepper';

export interface CreateOutgoingDocumentDialogProps {
  isOpen: boolean;
  curentStep: number;
  onConfirm?: () => void;
  onClose?: () => void;
}

const steps = [
  {
    label: 'Tải tệp lên'
  },
  {
    label: 'Tạo văn bản đi'
  }
];

export const CreateOutgoingDocumentDialog: React.FC<
  CreateOutgoingDocumentDialogProps
> = (props) => {
  const { isOpen, onClose, curentStep } = props;

  return (
    <Dialog
      open={isOpen}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: { lg: '300px', md: '300px', xs: '75vw' }
        }
      }}
      onClose={onClose}
    >
      <DialogContent>
        <BaseVerticalStepper activeStep={curentStep} steps={steps} />
      </DialogContent>
    </Dialog>
  );
};
