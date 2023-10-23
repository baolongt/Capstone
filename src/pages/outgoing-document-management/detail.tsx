import { Box, Divider, Paper, Stack, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { send } from '@/apis';
import { useGetOneDocument } from '@/apis/outgoingDocument/getOneDocument';
import { CustomButton, Loading } from '@/components/common';
import AppDocViewer from '@/components/common/document-viewer';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import {
  AddDocToFileDialog,
  ForwardDocumentDialog,
  PublishConfirmDialog
} from '@/components/dialogs';
import { AddPublishInfoDialog } from '@/components/dialogs/add-publish-info-dialog';
import {
  DetailAttachmentAccordion,
  DetailDescription,
  DetailTimeline,
  PublishInfo
} from '@/components/document';
import { OutgoingDocumentStatus } from '@/constants';
import { Attachment } from '@/models';
import { OutgoingPublishInfo } from '@/models/outgoingDocument';

const OutgoingDocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOneDocument(id ? parseInt(id) : -1);
  const [openModal, setOpenModal] = React.useState(false);
  const [openPublish, setOpenPublish] = React.useState(false);
  const [openConfirmPublish, setOpenConfirmPublish] = React.useState(false);
  const [docPreview, setDocPreview] = React.useState(false);
  const [docPreviewData, setDocPreviewData] = React.useState<{ uri: string }[]>(
    []
  );
  const [mode, setMode] = React.useState<'forward' | 'send-back'>('forward');
  const [openAddDocToFile, setOpenAddDocToFile] = React.useState(false);
  const newestStatus = data?.processHistory?.[0].status;
  const navigate = useNavigate();

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
                OutgoingDocumentStatus.CHO_LANH_DAO_DUYET
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
            {newestStatus != undefined &&
              OutgoingDocumentStatus.CHO_VAN_THU_LAY_SO === newestStatus && (
                <>
                  {!data.outgoingPublishInfo ? (
                    <>
                      <Tooltip title="Phải chọn người nhận trước khi chuyển tiếp">
                        <span>
                          <CustomButton disabled label="Chuyển tiếp" />
                        </span>
                      </Tooltip>
                      <CustomButton
                        label="Chọn người nhận"
                        onClick={() => setOpenPublish(true)}
                      />
                    </>
                  ) : (
                    <CustomButton
                      label="Chuyển tiếp"
                      onClick={() => handleOpenModal('forward')}
                    />
                  )}
                  <CustomButton
                    label="Trả lại"
                    variant="outlined"
                    onClick={() => handleOpenModal('send-back')}
                  />
                </>
              )}
            {newestStatus != undefined &&
              [OutgoingDocumentStatus.CHO_LANH_DAO_KY].includes(
                newestStatus
              ) && (
                <>
                  <CustomButton
                    label="Phát hành"
                    onClick={() => setOpenConfirmPublish(true)}
                  />
                </>
              )}
          </Stack>
        </PageHeader>
        <Box
          sx={{ mx: 'auto', width: '1080px', mt: 3, px: 2, minHeight: '80vh' }}
          component={Paper}
        >
          <DetailDescription sx={{ width: '100%' }} data={data} />
          {newestStatus === OutgoingDocumentStatus.DA_PHAT_HANH && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ my: 2 }}>
                Thông tin phát hành
              </Typography>
              <PublishInfo
                data={data.outgoingPublishInfo as OutgoingPublishInfo}
              />
            </>
          )}
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
        isOpen={openAddDocToFile}
        onClose={handleCloseAddDocToFile}
      />
      <AddPublishInfoDialog
        isOpen={openPublish}
        onClose={() => setOpenPublish(false)}
      />
      {data.outgoingPublishInfo && (
        <PublishConfirmDialog
          isOpen={openConfirmPublish}
          publishInfo={data.outgoingPublishInfo}
          onClose={() => setOpenConfirmPublish(false)}
        />
      )}
    </>
  );
};

export default OutgoingDocumentDetail;
