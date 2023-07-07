import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import { outgoingDocument } from '../../../models';
import { UseFormReturn } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import {
  InputField,
  MultilineTextField,
  SelectField,
  WrappedDragDropFileBox
} from '../../common/form-control';
import { SelectOption } from '../../../types';
import { Accept } from 'react-dropzone';

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

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4)
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    maxWidth: '100%'
  },
  textfield: {
    minWidth: '200px'
  },
  buttonGroup: {
    marginTop: theme.spacing(6),
    width: '100%'
  },
  required: {
    color: '#FF6347'
  }
}));

type createDocumentFormProps = {
  form: UseFormReturn<any>;
};

const CreateDocumentForm: React.FC<createDocumentFormProps> = ({ form }) => {
  const classes = useStyles();
  const [documentTypeOptions, setDocumentTypeOptions] = useState<SelectOption[]>(
    []
  );

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
    <>
      <div className={classes.root}>
        <Grid container className={classes.grid}>
          <Grid item xs={12} sm={8} md={6}>
            <Box className={classes.box}>
              <Typography variant="h4" gutterBottom>
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
                  <Typography>
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
                  <Typography>
                    Lĩnh vực văn bản
                    <Box component="span" color="error.main">
                      *
                    </Box>
                    <SelectField
                      data={documentFieldOptions}
                      onChange={onChangeDocumentField}
                      form={form}
                      name="documentFieldId"
                    />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
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
                  <Typography>
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
                  <Typography>
                    Ghi chú
                    <Box component="span" color="error.main">
                      *
                    </Box>
                  </Typography>
                  <MultilineTextField form={form} name="note" minRows={4} />
                </Grid>
                <Grid item xs={12}>
                  <Typography>File đính kèm</Typography>
                  <WrappedDragDropFileBox
                    fileAccpetType={fileAccpetType}
                    form={form}
                    name="files"
                  />
                </Grid>
                <Grid className={classes.buttonGroup} container spacing={2}>
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
    </>
  );
};

export default CreateDocumentForm;
