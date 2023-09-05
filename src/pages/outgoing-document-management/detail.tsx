import { Box, Stack, Typography, useTheme } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { useGetOneDocument } from '@/apis/outgoingDocument/getOneDocument';
import { CustomButton } from '@/components/common';
import { ForwardDocumentDialog } from '@/components/dialogs';
import {
  DetailAttachmentAccordion,
  DetailDescription,
  DetailTimeline
} from '@/components/document';
import { Attachment } from '@/models';

const OutgoingDocumentDetail = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOneDocument(id ? parseInt(id) : -1);
  const [openModal, setOpenModal] = React.useState(false);
  const [mode, setMode] = React.useState<'foward' | 'send-back'>('foward');

  const removeAttachment = (id: string) => {
    console.log('remove attachment', id);
  };

  const signAttachment = (id: string) => {
    console.log('sign', id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>Not found</div>;
  }

  const handleOpenModal = (mode: 'foward' | 'send-back') => {
    setMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            bgcolor: theme.palette.secondary.main,
            minHeight: '16vh'
          }}
        >
          <Box sx={{ mx: 'auto', width: '1080px' }}>
            <Box sx={{ py: 3 }}>
              <Typography variant="h4">Thông tin văn bản</Typography>
            </Box>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row">
              <CustomButton
                label="Chuyến tiếp"
                onClick={() => handleOpenModal('foward')}
              />
              <CustomButton
                label="Trả lại"
                variant="outlined"
                onClick={() => handleOpenModal('send-back')}
              />
            </Stack>
          </Box>
        </Box>
        <Box sx={{ mx: 'auto', width: '1080px', mt: 3 }}>
          <DetailDescription sx={{ width: '100%' }} data={data} />
          <DetailAttachmentAccordion
            attachments={data.attachments as Attachment[]}
            removeAttachment={removeAttachment}
            signAttachment={signAttachment}
            sx={{ mt: 2 }}
          />
          <DetailTimeline sx={{ mt: 2 }} processHistory={data.processHistory} />
        </Box>
      </Box>
      <ForwardDocumentDialog
        mode={mode}
        isOpen={openModal}
        id={parseInt(id ? id : '-1')}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default OutgoingDocumentDetail;
