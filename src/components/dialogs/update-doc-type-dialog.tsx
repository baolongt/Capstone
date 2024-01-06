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

import { useListDocumentFields } from '@/apis/documentType/listDocumentFields';

import { CustomButton, MultilineTextField, SelectField } from '../common';
import { updateDocTypeSchema } from './validations';

export interface UpdateDocTypesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  handleUpdate: (payload: { description: string; field: number }) => void;
}

export const UpdateDocTypesDialog = ({
  isOpen,
  onClose,
  isLoading,
  handleUpdate
}: UpdateDocTypesDialogProps) => {
  const form = useForm({
    defaultValues: {},
    resolver: yupResolver(updateDocTypeSchema)
  });
  const { handleSubmit } = form;

  const onSubmit = () => {
    handleUpdate(form.getValues());
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
          id="update-doc-type-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box component="div">
            <Typography>
              Lĩnh vực văn bản
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
          form="update-doc-type-form"
        >
          Cập nhật
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDocTypesDialog;
