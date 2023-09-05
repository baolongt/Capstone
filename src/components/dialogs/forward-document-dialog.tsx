import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import * as React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

import { validation } from '@/models';

import { ForwardForm, WithoutHandlerForwardForm } from '../document';

export type ForwardDocumentDialogProps = {
  mode: 'foward' | 'send-back';
  isOpen: boolean;
  onClose: () => void;
  id: number;
};

export const ForwardDocumentDialog: React.FC<ForwardDocumentDialogProps> = (
  props
) => {
  const { isOpen, onClose, mode, id } = props;
  const form = useForm({
    defaultValues: {
      documentId: id,
      newStatus: 1,
      newHandlerId: -1,
      note: ''
    }
  }) as UseFormReturn<validation.outgoingDocument.ForwardType, any>;

  const { handleSubmit, getValues, reset } = form;

  const onSubmit = () => {
    console.log('submit...', getValues());
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Dialog
      open={isOpen}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: { lg: '600px', md: '600px', xs: '75vw' }
        }
      }}
      onClose={handleClose}
    >
      <DialogTitle fontWeight={600}>
        {mode === 'foward' ? 'Chuyển tiếp' : 'Trả lại'}
      </DialogTitle>

      <DialogContent>
        {mode === 'foward' ? (
          <ForwardForm
            isSubmitForm={false}
            form={form}
            handleSubmitForm={onSubmit}
          />
        ) : (
          <WithoutHandlerForwardForm
            isSubmitForm={false}
            form={form}
            handleSubmitForm={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForwardDocumentDialog;
