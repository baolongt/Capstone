import PostAddIcon from '@mui/icons-material/PostAdd';
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { send } from '@/apis';
import { DocTypeEnum } from '@/apis/file/addDocToFile';
import { useGetOneDocument } from '@/apis/incomingDocument/getOneDocument';
import { Loading } from '@/components/common';
import AppDocViewer from '@/components/common/document-viewer';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import { AddDocToFileDialog } from '@/components/dialogs';
import {
  DetailAttachmentAccordion,
  DetailDescription,
  DetailTimeline
} from '@/components/document';
import DocComment from '@/components/document/comment';
import { Attachment } from '@/models';
import { DocumentType } from '@/models/comment';

const IncomingDocumentDetail = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOneDocument(id ? parseInt(id) : -1);
  const [docPreview, setDocPreview] = React.useState(false);
  const [docPreviewData, setDocPreviewData] = React.useState<{ uri: string }[]>(
    []
  );
  const [openAddDocToFile, setOpenAddDocToFile] = React.useState(false);
  const navigate = useNavigate();

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
          <DetailDescription
            sx={{ width: '100%' }}
            data={{
              epitomize: data.epitomize,
              documentNotation: data.incomingPublishInfo.incomingNotation,
              documentField: data.documentField,
              documentTypeName: data.documentTypeName,
              createdByName: data.createdByName
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <DetailAttachmentAccordion
              attachments={data.attachments as Attachment[]}
              watchAttachment={watchAttachment}
              signAttachment={signAttachment}
              addNumber={handleAddNumber}
              sx={{
                p: 2,
                mt: 2,
                overflow: 'auto',
                maxHeight: '40vh',
                width: '45%',
                py: 3
              }}
            />
            <DetailTimeline
              sx={{
                p: 2,
                mt: 2,
                overflow: 'auto',
                maxHeight: '40vh',
                width: '50%'
              }}
              processHistory={data.processHistory}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="h6"
            sx={{ color: theme.palette.secondary.dark, mb: 2 }}
          >
            Bình luận
          </Typography>
          <DocComment
            sx={{ width: '100%', mb: 3 }}
            docId={Number(id)}
            documentType={DocumentType.INCOMING}
          />
        </Box>
      </Box>

      <AppDocViewer
        docs={docPreviewData}
        open={docPreview}
        handleClose={handleClosePeview}
      />
      <AddDocToFileDialog
        isOpen={openAddDocToFile}
        docType={DocTypeEnum.INCOMING}
        onClose={handleCloseAddDocToFile}
      />
    </>
  );
};

export default IncomingDocumentDetail;
