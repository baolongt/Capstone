import { Box, Paper } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { useGetOneDocument } from '@/apis/outgoingDocument/getOneDocument';
import { CustomButton } from '@/components/common';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import { ForwardDocumentDialog } from '@/components/dialogs';
import {
  DetailAttachmentAccordion,
  DetailDescription,
  DetailTimeline
} from '@/components/document';
import { Attachment } from '@/models';

const OutgoingDocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOneDocument(id ? parseInt(id) : -1);
  const [openModal, setOpenModal] = React.useState(false);
  const [mode, setMode] = React.useState<'foward' | 'send-back'>('foward');
  const newestStatus = data?.processHistory?.[0].status;

  const watchAttachment = (attachmentId: string) => {
    console.log('watch attachment', attachmentId);
  };

  const signAttachment = (attachmentId: string) => {
    console.log('sign', attachmentId);
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
        <PageHeader>
          <Box>
            <PageTitle label="thông tin văn bản" />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              mt: 1
            }}
          >
            {/* //TODO: thêm chỉnh sửa */}
            {newestStatus === 5 && <CustomButton label="Chỉnh sửa" />}
            {/* // TODO: ban hành vản bản */}
            {newestStatus === 4 && <CustomButton label="Ban hành văn bản" />}
            {newestStatus != undefined &&
              [0, 1, 2, 3].includes(newestStatus) && (
                <>
                  <CustomButton
                    label="Chuyến tiếp"
                    onClick={() => handleOpenModal('foward')}
                  />
                  <CustomButton
                    label="Trả lại"
                    variant="outlined"
                    sx={{ ml: 2 }}
                    onClick={() => handleOpenModal('send-back')}
                  />
                </>
              )}
          </Box>
        </PageHeader>
        <Box
          sx={{ mx: 'auto', width: '1080px', mt: 3, px: 2, minHeight: '80vh' }}
          component={Paper}
        >
          <DetailDescription sx={{ width: '100%' }} data={data} />
          <DetailAttachmentAccordion
            attachments={data.attachments as Attachment[]}
            watchAttachment={watchAttachment}
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
        newestStatus={newestStatus}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default OutgoingDocumentDetail;
