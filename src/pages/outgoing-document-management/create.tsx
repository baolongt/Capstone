import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useUploadForm } from '@/apis/outgoingDocument';
import CreateDocumentForm from '@/components/document/outgoing/outgoing-doc-create-form';
import { UploadFile } from '@/models';
import { validation } from '@/types';

const CreateOutgoingDocumentPage: React.FC = () => {
  const {
    mutate: uploadForm,
    isLoading,
    isSuccess
  } = useUploadForm({
    onSuccess: () => {
      toast.success('Tạo mới văn bản đi thành công');
    },
    onError: () => {
      toast.error('Tạo mới văn bản đi thất bại');
    }
  });

  const form = useForm({
    defaultValues: {
      epitomize: '',
      documentField: 1,
      documentTypeId: 1,
      isRepliedDocument: false,
      status: 1,
      note: '',
      files: [] as UploadFile[]
    },
    resolver: yupResolver(validation.outgoingDocument.createSchema)
  }) as UseFormReturn<
    validation.outgoingDocument.CreateType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;

  const { getValues, reset } = form;

  const handleSubmitForm = () => {
    uploadForm(getValues());
  };

  useEffect(() => {
    reset();
  }, [isSuccess, reset]);

  return (
    <Box sx={{ px: 5 }}>
      <Grid container spacing={2} sx={{ mb: 3, mt: 3 }}>
        <Grid item xs={12} sx={{ mx: 10 }}>
          <Typography variant="h5">Đăng ký văn bản đi</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2, mx: 10 }}>
          <CreateDocumentForm
            isSubmitForm={isLoading}
            handleSubmitForm={handleSubmitForm}
            form={form}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateOutgoingDocumentPage;
