import { Box, Button, Grid, Typography } from '@mui/material';
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
import { outgoingDocument } from '@/models';
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

const { documentFieldOptions, documentTypeOptionsMap, statusOptions } =
  outgoingDocument;

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
    marginTop: theme.spacing(6),
    width: '100%'
  },
  [`& .${classes.required}`]: {
    color: '#FF6347'
  }
}));

type createDocumentFormProps = {
  form: UseFormReturn<any>;
};

const CreateDocumentForm: React.FC<createDocumentFormProps> = ({ form }) => {
  const [documentTypeOptions, setDocumentTypeOptions] = useState<
    SelectOption[]
  >([]);

  const { getValues, handleSubmit } = form;

  const submitHandler = () => {
    //TODO: call api
    console.log('values', getValues());
  };

  const onChangeDocumentField = () => {
    setDocumentTypeOptions(documentTypeOptionsMap[getValues().documentFieldId]);
  };

  useEffect(() => {
    setDocumentTypeOptions(documentTypeOptionsMap[getValues().documentFieldId]);
  }, []);

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
                    name="documentFieldId"
                    onChange={onChangeDocumentField}
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
                    form={form}
                    name="documentTypeId"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
                    Trạng thái
                    <Box component="span" color="error.main">
                      *
                    </Box>
                  </Typography>
                  <SelectField
                    data={statusOptions}
                    form={form}
                    name="status"
                    sx={{ maxWidth: '100%' }}
                  />
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
                </Grid>
                <Grid container className={classes.buttonGroup} spacing={2}>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Ký số
                    </Button>
                    <Button
                      style={{ marginLeft: '10px' }}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Chuyển cán bộ khác
                    </Button>
                    <Button
                      style={{ marginLeft: '10px' }}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Chuyển lãnh đạo phê duyệt
                    </Button>
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
