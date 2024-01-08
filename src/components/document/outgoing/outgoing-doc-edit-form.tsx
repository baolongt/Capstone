import { Box, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import * as React from 'react';
import { Accept } from 'react-dropzone';
import { UseFormReturn } from 'react-hook-form';

import {
  CustomButton,
  DatePickerField,
  DateTimePickerField,
  InputField,
  SelectField,
  WrappedDragDropFileBox
} from '@/components/common';
import { outgoingDocument } from '@/models';
import {
  documentFieldOptions,
  documentTypeOptionsMap
} from '@/models/outgoingDocument';
import { SelectOption } from '@/types';

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

interface EditFormProps {
  form: UseFormReturn<
    outgoingDocument.EditOutgoingDocument,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
  data?: outgoingDocument.EditOutgoingDocument;
  handleSave: () => void;
  watchAttachment?: (url: string) => void;
  signAttachment?: (id: string) => void;
}

const EditForm: React.FC<EditFormProps> = ({
  form,
  data,
  handleSave,
  watchAttachment,
  signAttachment
}) => {
  const {
    watch,
    setValue,
    formState: { isDirty }
  } = form;
  const documentField = watch('documentField');

  const [documentTypeOptions, setDocumentTypeOptions] = React.useState<
    SelectOption[]
  >([]);
  React.useEffect(() => {
    if (!documentField || documentTypeOptionsMap[documentField].length === 0) {
      // If documentTypeId is empty it should remove when send api
      setValue('documentTypeId', -1);
    } else {
      setValue('documentTypeId', 1);
    }

    setDocumentTypeOptions(documentTypeOptionsMap[documentField]);
  }, [documentField, setValue]);

  if (data) {
    return (
      <Stack>
        <Grid container spacing={2} component="form">
          <Grid item xs={12} sm={12}>
            <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
              Trích yếu
              <Box component="span" color="error.main">
                *
              </Box>
            </Typography>
            <InputField form={form} label="" name="epitomize" />
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
              Lĩnh vực văn bản
              <Box component="span" color="error.main">
                *
              </Box>
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
              <Box component="span" color="error.main">
                *
              </Box>
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
          <Grid item xs={12} sm={6}>
            <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
              Hạn xử lý{' '}
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
              watchAttachment={watchAttachment}
              signAttachment={signAttachment}
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
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    );
  }
};

export default EditForm;
