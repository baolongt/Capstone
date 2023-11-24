import { Box, Paper, Stack } from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { send } from '@/apis';
import { DocTypeEnum } from '@/apis/file/addDocToFile';
import { useGetOneDocument } from '@/apis/internalDocument/getOneDocument';
import { CustomButton, Loading } from '@/components/common';
import AppDocViewer from '@/components/common/document-viewer';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import {
  AddDocToFileDialog,
  ForwardDocumentDialog
} from '@/components/dialogs';
import { DetailAttachmentAccordion } from '@/components/document';
import {
  DetailDescription,
  DetailTimeline
} from '@/components/document/internal';
import { OutgoingDocumentStatus } from '@/constants';
import { Attachment } from '@/models';

const InternalDocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOneDocument(id ? parseInt(id) : -1);
  const [openModal, setOpenModal] = React.useState(false);
  const [docPreview, setDocPreview] = React.useState(false);
  const [docPreviewData, setDocPreviewData] = React.useState<{ uri: string }[]>(
    []
  );
  const [mode, setMode] = React.useState<'forward' | 'send-back'>('forward');
  const [openAddDocToFile, setOpenAddDocToFile] = React.useState(false);
  const newestStatus = data?.processHistory?.[0].status;
  const navigate = useNavigate();
  React.useEffect(() => {
    if (data) {
      if (data.registrationStatus === 1) {
        navigate('/internal-documents/create?step=2&&id=' + data.id);
      }
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  if (!data) {
    return <div>Not found</div>;
  }

  const handleOpenModal = (mode: 'forward' | 'send-back') => {
    setMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenAddDocToFile = () => {
    setOpenAddDocToFile(true);
  };

  const handleCloseAddDocToFile = () => {
    setOpenAddDocToFile(false);
  };

  const handleClosePeview = () => {
    setDocPreview(false);
  };

  const watchAttachment = (url: string) => {
    setDocPreviewData([{ uri: url }]);
    setDocPreview(true);
  };

  const handleAddNumber = async (attachmentId: string, url: string) => {
    navigate(`add-number?attachmentId=${attachmentId}&url=${url}`);
  };

  const signAttachment = async (attachmentId: string) => {
    send(attachmentId);
  };

  return (
    <>
      <Box>
        <PageHeader>
          <Box>
            <PageTitle label="thông tin văn bản" />
          </Box>
          <Stack
            spacing={{ xs: 1 }}
            direction="row"
            sx={{
              mt: 1
            }}
          >
            <CustomButton
              label="Thêm vào sổ công việc"
              onClick={handleOpenAddDocToFile}
            />
            {newestStatus === OutgoingDocumentStatus.CHO_CHINH_SUA && (
              <CustomButton
                label="Chỉnh sửa"
                onClick={() => navigate('edit')}
              />
            )}

            {newestStatus === OutgoingDocumentStatus.DANG_XU_LY && (
              <>
                <CustomButton
                  label="Chỉnh sửa"
                  onClick={() => navigate('edit')}
                />
                <CustomButton
                  label="Chuyển tiếp"
                  onClick={() => handleOpenModal('forward')}
                />
              </>
            )}
            {newestStatus != undefined &&
              [
                OutgoingDocumentStatus.CHO_TRUONG_PHONG_DUYET,
                OutgoingDocumentStatus.CHO_LANH_DAO_DUYET,
                OutgoingDocumentStatus.CHO_VAN_THU_LAY_SO
              ].includes(newestStatus) && (
                <>
                  <CustomButton
                    label="Chuyển tiếp"
                    onClick={() => handleOpenModal('forward')}
                  />
                  <CustomButton
                    label="Trả lại"
                    variant="outlined"
                    onClick={() => handleOpenModal('send-back')}
                  />
                </>
              )}
            {}
          </Stack>
        </PageHeader>
        <Box
          sx={{ mx: 'auto', width: '1080px', mt: 3, px: 2, minHeight: '80vh' }}
          component={Paper}
        >
          <DetailDescription data={data} sx={{ width: '100%' }} />
          <DetailAttachmentAccordion
            attachments={data.attachments as Attachment[]}
            watchAttachment={watchAttachment}
            signAttachment={signAttachment}
            addNumber={handleAddNumber}
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
      <AppDocViewer
        docs={docPreviewData}
        open={docPreview}
        handleClose={handleClosePeview}
      />
      <AddDocToFileDialog
        docType={DocTypeEnum.INTERNAL}
        isOpen={openAddDocToFile}
        onClose={handleCloseAddDocToFile}
      />
    </>
  );
};

export default InternalDocumentDetail;
