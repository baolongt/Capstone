import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useGetOneDocument } from '@/apis/outgoingDocument/getOneDocument';
import DetailForm from '@/components/document/outgoing/outgoing-doc-detail-form';
import { outgoingDocument } from '@/models';
import { validation } from '@/types';

const OutgoingDocumentDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetOneDocument(id ? parseInt(id) : -1);

  const form = useForm({
    defaultValues: {
      attachments: []
    },
    resolver: yupResolver(validation.outgoingDocument.detailSchema)
  }) as UseFormReturn<
    outgoingDocument.OutgoingDocument,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;

  const handleSave = () => {
    console.log('save');
  };

  React.useEffect(() => {
    if (data) {
      console.log(data);
      form.reset(data, { keepDirty: false });
    }
  }, [data, form]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ px: 5 }}>
      <Grid container spacing={2} sx={{ mb: 3, mt: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Thông tin văn bản đi</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2, mx: 10 }}>
          <DetailForm handleSave={handleSave} form={form} data={data} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OutgoingDocumentDetail;
