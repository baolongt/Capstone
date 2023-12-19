import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useCreateDocType } from '@/apis/documentType/createDocType';
import { useListDocumentFields } from '@/apis/documentType/listDocumentFields';
import { documentType } from '@/models';

import {
  CustomButton,
  InputField,
  MultilineTextField,
  SelectField
} from '../common';
import { addDocTypesSchema } from './validations';

export interface AddDocTypesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDocTypesDialog = ({ isOpen, onClose }: AddDocTypesDialogProps) => {
  const form = useForm({
    defaultValues: {},
    resolver: yupResolver(addDocTypesSchema)
  });
  const { handleSubmit, reset } = form;

  const { mutate: createDocType, isLoading } = useCreateDocType({
    onSuccess: () => {
      toast.success('Thêm loại văn bản thành công');
      onClose();
      reset();
    },
    onError: () => {
      toast.error('Thêm loại văn bản thất bại');
    }
  });
  const onSubmit = () => {
    const body = form.getValues();
    createDocType(body);
  };

  const { data: fields } = useListDocumentFields();
  return (
    <Dialog
      open={isOpen}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: { lg: '600px', md: '600px', xs: '75vw' }
        }
      }}
      onClose={onClose}
    >
      <DialogTitle fontWeight={600}>Thêm mới loại văn bản</DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          id="add-doc-type-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box component="div">
            <Typography>
              Loại văn bản
              <Box component="span" color="error.main">
                *
              </Box>
            </Typography>

            <InputField
              form={form}
              placeholder="Loại văn bản"
              name="name"
              label=""
            />
          </Box>
          <Box component="div">
            <Typography>
              Loại văn bản
              <Box component="span" color="error.main">
                *
              </Box>
            </Typography>

            <SelectField
              form={form}
              name="field"
              placeholder="Lĩnh vực"
              data={
                fields?.map((fields) => {
                  return { title: fields.field, value: fields.id };
                }) ?? []
              }
            />
          </Box>
          <Box component="div">
            <Typography>
              Mô tả
              <Box component="span" color="error.main">
                *
              </Box>
            </Typography>

            <MultilineTextField
              form={form}
              placeholder="Mô tả"
              name="description"
              label=""
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" variant="outlined" onClick={onClose} />
        <LoadingButton
          size="small"
          variant="contained"
          type="submit"
          loading={isLoading}
          form="add-doc-type-form"
        >
          Thêm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddDocTypesDialog;
