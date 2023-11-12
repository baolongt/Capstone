import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import moment from 'moment';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetFileById } from '@/apis';
import { Loading } from '@/components/common';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import RemoveDocFromFileDialog from '@/components/dialogs/remove-doc-from-file-dialog';
import { FileDetailDocsTable } from '@/components/file';

const labelFontWeight = 600;
const GridItem = (props: { label: string; value: string }) => {
  return (
    <Grid item xs={6}>
      <Typography variant="subtitle1" sx={{ fontWeight: labelFontWeight }}>
        {props.label}: {'  '}
        <Typography component="span">{props.value}</Typography>
      </Typography>
    </Grid>
  );
};

const DocButtonFilter = ({
  docType,
  setDocType
}: {
  docType: 'incoming' | 'outgoing' | 'internal';
  setDocType: Dispatch<SetStateAction<'incoming' | 'outgoing' | 'internal'>>;
}) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Button
        variant={docType === 'outgoing' ? 'contained' : 'text'}
        onClick={() => {
          setDocType('outgoing');
        }}
      >
        Văn bản đến
      </Button>
      <Button
        variant={docType === 'incoming' ? 'contained' : 'text'}
        onClick={() => {
          setDocType('incoming');
        }}
      >
        Văn bản đến
      </Button>
      <Button
        variant={docType === 'internal' ? 'contained' : 'text'}
        onClick={() => {
          setDocType('internal');
        }}
      >
        Văn bản đi
      </Button>
    </Box>
  );
};

const FileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [openRemoveDoc, setOpenRemoveDoc] = React.useState(false);
  const [docType, setDocType] = React.useState<
    'incoming' | 'outgoing' | 'internal'
  >('outgoing');
  const [selectedDoc, setSelectedDoc] = React.useState<number>();
  const {
    data: file,
    isLoading,
    refetch
  } = useGetFileById({
    id: Number(id),
    docType: docType
  });

  useEffect(() => {
    refetch();
  }, [docType]);

  const handleOpenRemoveDoc = (docId: number) => {
    setSelectedDoc(docId);
    setOpenRemoveDoc(true);
  };

  const handleCloseRemoveDoc = () => {
    setOpenRemoveDoc(false);
  };

  if (isLoading) return <Loading />;
  if (file) {
    return (
      <>
        <PageHeader>
          <Box>
            <PageTitle label="Sổ văn bản" />
          </Box>
        </PageHeader>
        <Box
          sx={{ mx: 'auto', width: '1080px', mt: 3, px: 2, minHeight: '80vh' }}
          component={Paper}
        >
          <Grid container spacing={2}>
            <GridItem label="Tiêu đề sổ" value={file?.title} />
            <GridItem label="Số và kí hiệu" value={file?.fileNotation} />
            <GridItem label="Năm tạo sổ" value={file?.fileCreatedYear} />
            <GridItem label="Người tạo" value={file?.creator} />
            <GridItem
              label="Ngày áp dụng"
              value={moment(file?.startDate).format('DD/MM/YYYY')}
            />
            <GridItem
              label="Ngày đóng sổ"
              value={moment(file?.endDate).format('DD/MM/YYYY')}
            />
            <GridItem label="Tổng số văn bản" value={String(file?.docTotal)} />
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: labelFontWeight }}
              >
                Mô tả: {'  '}
              </Typography>
              <Typography component="span">{file?.description}</Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
            Văn bản
          </Typography>
          <DocButtonFilter setDocType={setDocType} docType={docType} />
          <FileDetailDocsTable
            docType={docType}
            handleOpenRemoveDoc={handleOpenRemoveDoc}
            data={file?.docs}
          />
        </Box>
        <RemoveDocFromFileDialog
          docType={docType}
          isOpen={openRemoveDoc}
          fileId={Number(id) || -1}
          outGoingDocumentId={selectedDoc || -1}
          onClose={handleCloseRemoveDoc}
        />
      </>
    );
  }
};

export default FileDetail;
