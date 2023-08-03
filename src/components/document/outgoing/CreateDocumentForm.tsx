import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Accept } from 'react-dropzone';
import { UseFormReturn } from 'react-hook-form';

import {
  InputField,
  MultilineTextField,
  SelectField,
  WrappedDragDropFileBox
} from '@/components/common';
import { LoadingButton } from '@/components/common/button';
import { BaseCheckbox } from '@/components/common/form-control/check-box';
import { outgoingDocument } from '@/models';
import { SelectOption, validation } from '@/types';

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

const { documentFieldOptions, documentTypeOptionsMap } = outgoingDocument;

const PREFIX = 'MyForm';
const classes = {
  root: `${PREFIX}-root`,
  grid: `${PREFIX}-grid`,
  box: `${PREFIX}-box`,
  textfield: `${PREFIX}-textfield`,
  buttonGroup: `${PREFIX}-buttonGroup`,
  required: `${PREFIX}-required`
};
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    flexGrow: 1,
    marginTop: theme.spacing(4)
  },
  [`& .${classes.grid}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  [`& .${classes.box}`]: {
    maxWidth: '100%'
  },
  [`& .${classes.textfield}`]: {
    minWidth: '200px'
  },
  [`& .${classes.buttonGroup}`]: {
    marginTop: theme.spacing(3),
    width: '100%'
  },
  [`& .${classes.required}`]: {
    color: '#FF6347'
  }
}));
type createDocumentFormProps = {
  form: UseFormReturn<
    validation.outgoingDocument.CreateType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  isSubmitForm: boolean;
  handleSubmitForm: () => void;
};

const CreateDocumentForm: React.FC<createDocumentFormProps> = ({
  form,
  handleSubmitForm,
  isSubmitForm
}) => {
  const [documentTypeOptions, setDocumentTypeOptions] = useState<
    SelectOption[]
  >([]);

  const { handleSubmit, watch, setValue } = form;
  const documentField = watch('documentField');

  const submitHandler = () => {
    //TODO: call api
    handleSubmitForm();
  };

  useEffect(() => {
    if (documentTypeOptionsMap[documentField].length === 0) {
      // If documentTypeId is empty it should remove when send api
      setValue('documentTypeId', -1);
    } else {
      setValue('documentTypeId', 1);
    }

    setDocumentTypeOptions(documentTypeOptionsMap[documentField]);
  }, [documentField, setValue]);

  return (
    <Root>
      <div className={classes.root}>
        <Grid container className={classes.grid}>
          <Grid item xs={12} sm={8} md={6}>
            <Box component="div" className={classes.box}>
              <Typography gutterBottom variant="h4" fontWeight="bold">
                Đăng ký văn bản đi
              </Typography>
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
                  <InputField
                    label=""
                    className={classes.textfield}
                    form={form}
                    name="epitomize"
                  />
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
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <Box component="div" sx={{ marginTop: '10px' }}>
                      <Typography fontWeight="bold">Văn bản trả lời</Typography>
                    </Box>
                    <BaseCheckbox
                      formHook={form}
                      name="isRepliedDocument"
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
                    Ghi chú
                    <Box component="span" color="error.main">
                      *
                    </Box>
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
                    name="files"
                  />
                  <Typography
                    gutterBottom
                    sx={{ paddingTop: '1px' }}
                    variant="caption"
                    display="block"
                  >
                    Tuỳ theo loại văn bản mà có thể có hoặc không có file đính
                    kèm
                  </Typography>
                </Grid>
                <Grid container className={classes.buttonGroup} spacing={2}>
                  <Grid item xs={12}>
                    {isSubmitForm ? (
                      <LoadingButton
                        disabled={true}
                        style={{ marginLeft: '10px' }}
                        variant="contained"
                        color="primary"
                      >
                        Chuyển lãnh đạo phê duyệt
                      </LoadingButton>
                    ) : (
                      <Button
                        style={{ marginLeft: '10px' }}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Chuyển lãnh đạo phê duyệt
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Root>
  );
};

export default CreateDocumentForm;
