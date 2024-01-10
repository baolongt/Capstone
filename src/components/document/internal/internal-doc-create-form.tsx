import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, Stack, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { Accept } from 'react-dropzone';
import { UseFormReturn } from 'react-hook-form';

import { useListDocumentFields } from '@/apis/documentType/listDocumentFields';
import { useListDocumentTypes } from '@/apis/documentType/listDocumentTypes';
import {
  DateTimePickerField,
  InputField,
  SelectField,
  WrappedDragDropFileBox
} from '@/components/common';
import { internalDocument, validation } from '@/models';

const fileAccpetType: Accept = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx'
  ],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
    '.xlsx'
  ],
  'application/pdf': ['.pdf']
};

const { priorityOptions } = internalDocument;

type createDocumentFormProps = {
  form: UseFormReturn<
    validation.internalDocument.CreateType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  isSubmitForm: boolean;
  handleSubmitForm: () => void;
  sx?: SxProps;
};

const CreateInternalDocumentForm: React.FC<createDocumentFormProps> = ({
  form,
  handleSubmitForm,
  isSubmitForm,
  sx
}) => {
  const { handleSubmit, watch, setValue } = form;
  const documentField = watch('documentField');

  const { data: fields } = useListDocumentFields();
  const { data: types } = useListDocumentTypes({
    queryParams: {
      page: 1,
      size: 10_000
    },
    field: documentField
  });

  const submitHandler = () => {
    handleSubmitForm();
  };

  return (
    <Stack spacing={1} sx={sx}>
      <Grid
        container
        spacing={2}
        component="form"
        id="create-document-form"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Grid item xs={12}>
          <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
            Trích yếu
            <Box component="span" color="error.main">
              *
            </Box>
          </Typography>
          <InputField label="" form={form} name="epitomize" />
        </Grid>
        <Grid item xs={12}>
          <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
            Số hiệu văn bản
            <Box component="span" color="error.main">
              *
            </Box>
          </Typography>
          <InputField label="" form={form} name="internalNotation" />
        </Grid>
        <Grid item xs={6}>
          <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
            Lĩnh vực văn bản
            <Box component="span" color="error.main">
              *
            </Box>
          </Typography>
          <SelectField
            data={
              fields?.map((field) => {
                return {
                  value: field.id,
                  title: field.field
                };
              }) ?? []
            }
            form={form}
            name="documentField"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
            Loại văn bản
          </Typography>
          <SelectField
            data={
              types?.data.map((type) => {
                return {
                  value: type.id,
                  title: type.name
                };
              }) ?? []
            }
            form={form}
            name="documentTypeId"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
            Độ ưu tiên
            <Box component="span" color="error.main">
              *
            </Box>
          </Typography>
          <SelectField data={priorityOptions} form={form} name="priority" />
        </Grid>
        <Grid item xs={6}>
          <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
            Hạn xử lý
            <Box component="span" color="error.main">
              *
            </Box>
          </Typography>
          <DateTimePickerField
            form={form}
            name="processDeadline"
            minDate={dayjs()}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
            File đính kèm
            <Box component="span" color="error.main">
              *
            </Box>
          </Typography>
          <WrappedDragDropFileBox
            fileAccpetType={fileAccpetType}
            form={form}
            name="files"
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={isSubmitForm}
          >
            Tạo văn bản
          </LoadingButton>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CreateInternalDocumentForm;
