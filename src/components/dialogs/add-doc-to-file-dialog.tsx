import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useListFiles } from '@/apis';
import { useAddDocToFile } from '@/apis/file/addDocToFile';
import { file } from '@/models';
import { BaseTableQueryParams } from '@/types';

import { CustomButton, FieldTitle } from '../common';
import AutocompleteInput from '../common/form-control/autocomplete';
import { addDocToFileSchema } from './validations';

export type AddDocToFileProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: file.File[];
};

export const AddDocToFileDialog: React.FC<AddDocToFileProps> = ({
  isOpen,
  onClose
}) => {
  const [queryParams, setQueryParams] = React.useState<BaseTableQueryParams>({
    page: 1,
    size: 10_000
  });
  const { data: filesResponse } = useListFiles({ queryParams });
  const { id } = useParams<{ id: string }>();

  const [files, setFiles] = React.useState<file.File[]>([]);

  useEffect(() => {
    if (filesResponse?.data) {
      setFiles(filesResponse.data);
    }
  }, [filesResponse]);

  const form = useForm({
    defaultValues: {
      outGoingDocumentId: Number(id)
    },
    resolver: yupResolver(addDocToFileSchema)
  });

  const { reset } = form;

  const handleClose = () => {
    onClose();
    reset();
  };

  const { mutate: addDocToFile } = useAddDocToFile({
    onSuccess: () => {
      toast.success('Thêm vào sổ thành công');
      handleClose();
    },
    onError: () => {
      toast.error('Thêm vào sổ thất bại');
    }
  });

  const onSubmit = () => {
    const { outGoingDocumentId, fileId } = form.getValues();
    console.log({ outGoingDocumentId, fileId });
    if (outGoingDocumentId && fileId) {
      return addDocToFile({
        outGoingDocumentId,
        fileId
      });
    }
  };

  const onSearchChange = (textSearch: string) => {
    return setQueryParams({ ...queryParams, search: textSearch });
  };
  return (
    <Dialog
      sx={{ overflowY: 'visible' }}
      fullWidth={true}
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle fontWeight={600}>Thêm vào sổ công việc</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            minHeight: '50px'
          }}
        >
          <FieldTitle title="Sổ công việc" isRequired={true} />
          <AutocompleteInput
            form={form}
            name="fileId"
            //   multiple={true}
            //   filterSelectedOptions={true}
            data={
              files?.map((file) => {
                return {
                  title: file.title,
                  value: file.id
                };
              }) || []
            }
            onSearchChange={onSearchChange}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Thêm" onClick={onSubmit} />
      </DialogActions>
    </Dialog>
  );
};
