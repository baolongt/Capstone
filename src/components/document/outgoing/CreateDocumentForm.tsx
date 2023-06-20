import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/base';
import { Grid, InputLabel, Typography } from '@mui/material';
import DragAndDropBox from './DragAndDropBox';
import { outgoingDocument } from '../../../models';
import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormReturn
} from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import {
  InputField,
  MultilineTextField,
  SelectField,
  WrappedDragDropFileBox
} from '../../common/form-control';
import { SelectItem } from '../../../types';
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
  },
  asterisk: {
    display: 'inline'
  }
}));

type createDocumentFormProps = {
  form: UseFormReturn<outgoingDocument.CreateOutgoingDocument>;
  errors: FieldErrors<FieldValues>;
  input: Partial<outgoingDocument.CreateOutgoingDocument>;
  setInput: React.Dispatch<
    React.SetStateAction<Partial<outgoingDocument.CreateOutgoingDocument>>
  >;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  onSubmitHandler: (
    // eslint-disable-next-line no-unused-vars
    data: Partial<outgoingDocument.CreateOutgoingDocument>
  ) => void;
};

const CreateDocumentForm: React.FC<createDocumentFormProps> = (props) => {
  const { input, setInput, onSubmitHandler, form } = props;
  const classes = useStyles();
  const [documentTypeOptions, setDocumentTypeOptions] = useState<SelectItem[]>(
    []
  );

  const testSubmit = (e: any) => {
    e.preventDefault();
    onSubmitHandler(input);
  };

  const onChangeDocumentField = (event: any) => {
    setDocumentTypeOptions(documentTypeOptionsMap[event.target.value]);
    setInput({ ...input, documentFieldId: event.target.value });
  };

  const onChangeFiles = (files: File[]) => {
    setInput({ ...input, files });
  };

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
                id="add-user-form"
                onSubmit={testSubmit}
              >
                <Grid item xs={12}>
                  <Typography>
                    Trích yếu
                    <Box component="span" color="error.main">
                      *
                    </Box>
                    <InputField
                      label=""
                      className={classes.textfield}
                      id="epitomize"
                      form={form}
                      name="epitomize"
                    />
                  </Typography>
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
                      id="documentFieldId"
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
                    <SelectField
                      data={documentTypeOptions}
                      id="documentTypeId"
                      form={form}
                      name="documentTypeId"
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Trạng thái
                    <Box component="span" color="error.main">
                      *
                    </Box>
                    <SelectField
                      data={statusOptions}
                      id="status"
                      form={form}
                      name="status"
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Ghi chú
                    <Box component="span" color="error.main">
                      *
                    </Box>
                    <MultilineTextField
                      id="note"
                      form={form}
                      name="note"
                      minRows={4}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Ghi chú
                    <Box component="span" color="error.main">
                      *
                    </Box>
                    <WrappedDragDropFileBox
                      fileAccpetType={fileAccpetType}
                      form={form}
                      name="files"
                    />
                  </Typography>
                </Grid>
              </Grid>
              <FormControl style={{ width: '100%', marginTop: '20px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputLabel id="field-label">File đính kèm</InputLabel>
                    <DragAndDropBox onChangeFiles={onChangeFiles} />
                  </Grid>
                </Grid>
              </FormControl>
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
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CreateDocumentForm;
