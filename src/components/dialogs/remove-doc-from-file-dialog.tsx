import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { toast } from 'react-toastify';

import { DocTypeEnum } from '@/apis/file/addDocToFile';
import { useRemoveDocFromFile } from '@/apis/file/removeDocFromFile';

interface RemoveDocFromFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  outGoingDocumentId: number;
  fileId: number;
  docType: 'incoming' | 'outgoing' | 'internal';
}

const RemoveDocFromFileDialog = ({
  isOpen,
  onClose,
  outGoingDocumentId,
  fileId,
  docType
}: RemoveDocFromFileDialogProps) => {
  const { mutate: removeDocFromFile } = useRemoveDocFromFile({
    onSuccess: () => {
      toast.success('Xoá tài liệu khỏi sổ công việc thành công');
      onClose();
    },

    onError: () => {
      toast.error('Xoá tài liệu khỏi sổ công việc thất bại');
    }
  });

  const onSubmit = () => {
    if (outGoingDocumentId && fileId) {
      return removeDocFromFile({
        outGoingDocumentId,
        fileId,
        docType
      });
    }
  };

  return (
    <Dialog fullWidth={true} open={isOpen} onClose={onClose}>
      <DialogTitle fontWeight={600}>Xoá tài liệu khỏi sổ công việc</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            minHeight: '50px'
          }}
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
            Bạn có muốn xoá tài liệu này khỏi sổ công việc không?
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveDocFromFileDialog;
