import { Grid, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { Accept } from 'react-dropzone';
import { useForm, UseFormReturn } from 'react-hook-form';

import {
  CustomButton,
  InputField,
  MultilineTextField,
  SelectField,
  WrappedDragDropFileBox
} from '@/components/common';
import { outgoingDocument } from '@/models';
import { documentFieldOptions } from '@/models/outgoingDocument';
import { SelectOption } from '@/types';

const fileAccpetType: Accept = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx'
  ],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
};

interface DetailFormProps {
  form: UseFormReturn<
    outgoingDocument.OutgoingDocument,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
  data?: outgoingDocument.OutgoingDocument;
  handleSave: () => void;
}

const DetailForm: React.FC<DetailFormProps> = ({ form, data, handleSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const {
    formState: { isDirty }
  } = form;

  console.log('isDirty', isDirty);

  const [documentTypeOptions, setDocumentTypeOptions] = React.useState<
    SelectOption[]
  >([]);

  const handleFormSubmit = (data: any) => {
    console.log('submit');
  };
  if (data) {
    return (
      <Stack spacing={1}>
        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Grid item xs={12} sm={12}>
            <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
              Trích yếu
            </Typography>
            <InputField form={form} label="" name="epitomize" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
              Ký hiệu văn bản
            </Typography>
            <InputField label="" name="documentNotation" form={form} />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={6}>
            <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
              Lĩnh vực văn bản
            </Typography>
            <SelectField
              data={documentFieldOptions}
              form={form}
              name="documentField"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
              Loại văn bản
            </Typography>
            <SelectField
              data={documentTypeOptions}
              disabled={
                documentTypeOptions && documentTypeOptions.length === 0
                  ? true
                  : false
              }
              form={form}
              name="documentTypeId"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
              Người tạo
            </Typography>
            <InputField disabled form={form} label="" name="createdBy" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
              Ngày ban hành
            </Typography>
            <InputField
              disabled
              form={form}
              label=""
              name="publishDate"
              type="date"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
              Hạn xử lý
            </Typography>
            <InputField
              form={form}
              label=""
              name="processDeadline"
              type="date"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
              Ghi chú
            </Typography>
            <MultilineTextField form={form} name="note" minRows={4} />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
              File đính kèm
            </Typography>
            <WrappedDragDropFileBox
              fileAccpetType={fileAccpetType}
              form={form}
              name="attachments"
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <CustomButton
                disabled={!isDirty}
                variant="outlined"
                label="Lưu"
                onClick={handleSave}
              />
              <CustomButton disabled={isDirty} label="Chuyển về chuyên viên" />
              <CustomButton disabled={isDirty} label="Chuyển" />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    );
  }
};

export default DetailForm;
