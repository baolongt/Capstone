import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import * as React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useForwardDocument } from '@/apis/outgoingDocument/forwardDocument';
import { OutgoingDocumentStatus } from '@/constants';
import { validation } from '@/models';

import { ForwardForm, WithoutHandlerForwardForm } from '../document';

export type ForwardDocumentDialogProps = {
  mode: 'forward' | 'send-back';
  isOpen: boolean;
  onClose: () => void;
  id: number;
  newestStatus?: number;
};

export const ForwardDocumentDialog: React.FC<ForwardDocumentDialogProps> = (
  props
) => {
  const { isOpen, onClose, mode, id, newestStatus = -1 } = props;
  const navigate = useNavigate();
  const { mutate: forwardDocument, isLoading } = useForwardDocument({
    onSuccess: () => {
      toast.success('Chuyển văn bản đi thành công');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error ? error.message : 'Chuyển văn bản đi thất bại');
    }
  });
  const form = useForm({
    defaultValues: {
      documentId: id,
      newStatus: newestStatus + 1,
      newHandlerId: -1,
      newNote: ''
    }
  }) as UseFormReturn<validation.outgoingDocument.ForwardType, any>;

  const { getValues, reset, setValue } = form;
  if (mode === 'send-back') {
    setValue('newStatus', 5);
  }

  const onSubmit = () => {
    forwardDocument(getValues());
    handleClose();
    navigate('/outgoing-documents');
  };

  const handleClose = () => {
    reset();
    onClose();
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
        {mode === 'forward' ? 'Chuyển tiếp' : 'Trả lại'}
      </DialogTitle>

      <DialogContent>
        {newestStatus === OutgoingDocumentStatus.CHO_TRUONG_PHONG_DUYET ||
        newestStatus === OutgoingDocumentStatus.CHO_VAN_THU_LAY_SO ? (
          <ForwardForm form={form} />
        ) : (
          <WithoutHandlerForwardForm form={form} />
        )}
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          onClick={onSubmit}
        >
          {mode === 'forward' ? 'Chuyển tiếp' : 'Trả lại'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ForwardDocumentDialog;
