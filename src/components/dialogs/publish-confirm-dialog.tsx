import { LoadingButton } from '@mui/lab';
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useForwardDocument } from '@/apis/outgoingDocument/forwardDocument';
import { validation } from '@/models';
import { OutgoingPublishInfo } from '@/models/outgoingDocument';

import { CustomButton } from '../common';

interface PublishConfirmDialogProps {
  publishInfo: OutgoingPublishInfo;
  isOpen: boolean;
  onClose: () => void;
}

export const PublishConfirmDialog = ({
  publishInfo,
  onClose,
  isOpen
}: PublishConfirmDialogProps) => {
  const {
    outgoingDocumentId,
    outgoingNumber,
    outgoingNotation,
    priority,
    dueDate,
    contactLists
  } = publishInfo;
  const navigate = useNavigate();

  const { mutate: forwardDocument, isLoading } = useForwardDocument({
    id: outgoingDocumentId,
    onSuccess: () => {
      toast.success('Phát hành văn bản thành công');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error ? error.message : 'Phát hành văn bản thất bại');
    }
  });
  const form = useForm({
    defaultValues: {
      documentId: outgoingDocumentId,
      newStatus: 6,
      newHandlerId: -1,
      newNote: ''
    }
  }) as UseFormReturn<validation.outgoingDocument.ForwardType, any>;

  const { getValues } = form;

  const onSubmit = () => {
    forwardDocument(getValues());
    onClose();
    navigate('/outgoing-documents');
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          minWidth: { lg: '350px' }
        }
      }}
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>Thông tin phát hành</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Box sx={{ '& > *': { mb: 1 } }}>
            <Typography>
              <span style={{ fontWeight: 'bold' }}>Ký hiệu văn bản:</span>{' '}
              {outgoingNumber}
            </Typography>
            <Typography>
              <span style={{ fontWeight: 'bold' }}>Số bản phát hành:</span>{' '}
              {outgoingNotation}
            </Typography>
            <Typography>
              <span style={{ fontWeight: 'bold' }}>Độ ưu tiên:</span> {priority}
            </Typography>
            <Typography>
              <span style={{ fontWeight: 'bold' }}>Hạn xử lý:</span>{' '}
              {dayjs(dueDate).format('DD-MM-YYYY')}
            </Typography>
            <Typography sx={{ maxHeight: '200px', overflowY: 'scroll' }}>
              <span style={{ fontWeight: 'bold' }}>Liên hệ:</span>
            </Typography>
            {contactLists.map((cl) => (
              <Chip
                key={cl.id}
                label={cl.name}
                variant="outlined"
                sx={{ mr: 1 }}
              />
            ))}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <CustomButton label="Hủy bỏ" variant="outlined" onClick={onClose} />
        <LoadingButton
          variant="contained"
          loading={isLoading}
          onClick={onSubmit}
        >
          Phát hành
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
