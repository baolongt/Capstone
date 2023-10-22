import { LoadingButton } from '@mui/lab';
import {
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

interface OutgoingDocumentInfo {
  id: number;
  outgoingNumber: number;
  outgoingNotation: string;
  publishDate: string;
  dueDate: string;
  priority: number;
  issuedAmount: number;
  publishStatus: number;
  contactLists: ContactList[];
}

interface ContactList {
  id: number;
  name: string;
  organCode: string;
  email: string;
  phone: string;
}
interface PublishConfirmDialogProps {
  publishInfo: OutgoingDocumentInfo;
  isOpen: boolean;
  onClose: () => void;
}

export const PublishConfirmDialog = ({
  publishInfo,
  onClose,
  isOpen
}: PublishConfirmDialogProps) => {
  const {
    id,
    outgoingNumber,
    outgoingNotation,
    priority,
    dueDate,
    contactLists
  } = publishInfo;
  const navigate = useNavigate();

  const { mutate: forwardDocument, isLoading } = useForwardDocument({
    id: id,
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
      documentId: id,
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
          <Typography>Ký hiệu văn bản: {outgoingNumber}</Typography>
          <Typography>Số bản phát hành: {outgoingNotation}</Typography>
          <Typography>Độ ưu tiên: {priority}</Typography>
          <Typography>
            Hạn xử lý: {dayjs(dueDate).format('DD-MM-YYYY')}
          </Typography>
          <Typography>
            Liên hệ: {contactLists.map((cl) => cl.email).join(',')}
          </Typography>
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
