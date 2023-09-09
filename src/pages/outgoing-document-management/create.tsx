import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useUploadForm } from '@/apis/outgoingDocument';
import CreateDocumentForm from '@/components/document/outgoing/outgoing-doc-create-form';
import { DEFAULT_PAGE_WIDTH } from '@/constants';
import { UploadFile, validation } from '@/models';

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
      status: 1,
      note: '',
      processDeadline: new Date().toISOString(),
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
    // console.log(getValues());
    uploadForm(getValues());
  };

  useEffect(() => {
    reset();
  }, [isSuccess, reset]);

  return (
    <Box>
      <Box bgcolor="#fff" sx={{ mb: 3 }}>
        <Box sx={{ mx: 'auto', width: DEFAULT_PAGE_WIDTH }}>
          <Box sx={{ py: 2, mt: 2 }}>
            <Typography variant="h4">ĐĂNG KÝ VĂN BẢN ĐI</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ mx: 'auto', width: DEFAULT_PAGE_WIDTH, pr: 4, pb: 2 }}
        component={Paper}
      >
        <CreateDocumentForm
          isSubmitForm={isLoading}
          handleSubmitForm={handleSubmitForm}
          form={form}
          sx={{ width: '100%' }}
        />
      </Box>
    </Box>
  );
};

export default CreateOutgoingDocumentPage;
