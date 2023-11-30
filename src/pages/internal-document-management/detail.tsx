import PostAddIcon from '@mui/icons-material/PostAdd';
import { Box, IconButton, Paper, Stack, Tooltip } from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { send } from '@/apis';
import { DocTypeEnum } from '@/apis/file/addDocToFile';
import { useGetOneDocument } from '@/apis/internalDocument/getOneDocument';
import { Loading } from '@/components/common';
import AppDocViewer from '@/components/common/document-viewer';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import { AddDocToFileDialog } from '@/components/dialogs';
import { DetailAttachmentAccordion } from '@/components/document';
import {
  DetailDescription,
  DetailTimeline
} from '@/components/document/internal';
import { Attachment } from '@/models';

const InternalDocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOneDocument(id ? parseInt(id) : -1);
  const [docPreview, setDocPreview] = React.useState(false);
  const [docPreviewData, setDocPreviewData] = React.useState<{ uri: string }[]>(
    []
  );
  const [openAddDocToFile, setOpenAddDocToFile] = React.useState(false);
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
            <Tooltip title="Thêm vào sổ công việc">
              <IconButton color="info" onClick={handleOpenAddDocToFile}>
                <PostAddIcon />
              </IconButton>
            </Tooltip>
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
