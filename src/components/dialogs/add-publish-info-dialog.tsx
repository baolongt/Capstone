import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGetPublishNumber } from '@/apis';
import { useListContacts } from '@/apis/contact';
import { useAddPublishInfo } from '@/apis/outgoingDocument/addPublishInfo';
import {
  CustomButton,
  DatePickerField,
  FieldTitle,
  InputField,
  MultilineTextField,
  SelectField
} from '@/components/common';
import { priorityOptions } from '@/constants';

import AutocompleteInput from '../common/form-control/autocomplete';
import { addPublishInfoSchema } from './validations';

interface AddPublishInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PublishInfoPayload {
  documentId: number;
  publishNumber: number;
  documentNotation: string;
  description: string;
  contactIds: number[];
  priority: number;
  dueDate: Date;
}

export const AddPublishInfoDialog: React.FC<AddPublishInfoDialogProps> = ({
  isOpen,
  onClose
}) => {
  const { id } = useParams<{ id: string }>();
  const form = useForm<PublishInfoPayload>({
    defaultValues: {
      documentId: 0,
      publishNumber: 0,
      documentNotation: '',
      description: '',
      contactIds: [],
      priority: 0
    },
    resolver: yupResolver(addPublishInfoSchema) as Resolver<
      PublishInfoPayload,
      any
    >
  });

  const { handleSubmit, reset } = form;
  const { mutate: addPublishInfoMutate } = useAddPublishInfo({
    onSuccess: () => {
      toast.success('Thêm thông tin thành công');
      handleClose();
    },
    onError: () => {
      toast.error('Thêm thông tin thất bại');
    }
  });

  const { data: publishNumber, refetch } = useGetPublishNumber();
  const { data: contacts } = useListContacts({
    queryParams: {
      size: 10_000,
      page: 1
    }
  });

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const onSubmit = async (data: PublishInfoPayload) => {
    await refetch();
    addPublishInfoMutate({
      ...data,
      documentId: data.documentId || -1,
      publishNumber: publishNumber || -1,
      pageNumber: 0,
      dueDate: data.dueDate.toISOString()
    });
  };

  useEffect(() => {
    reset(
      {
        documentId: id ? parseInt(id) : 0,
        publishNumber: 0,
        documentNotation: '',
        dueDate: new Date()
      },
      {
        keepDirty: false
      }
    );
  }, [id, reset]);

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
      <DialogTitle fontWeight={600}>Thêm thông tin xuất bản</DialogTitle>

      <DialogContent>
        <Stack
          component="form"
          id="add-publish-info-form"
          gap={2}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box component="div">
            <FieldTitle title="Ký hiệu văn bản" isRequired={true} />
            <InputField
              form={form}
              placeholder="Nhập ký hiệu"
              name="documentNotation"
              label=""
            />
          </Box>
          <Box component="div">
            <FieldTitle title="Hạn xử lý" isRequired={true} />
            <DatePickerField
              form={form}
              placeholder="Nhập hạn xử lý"
              name="dueDate"
              label=""
              minDate={dayjs()}
            />
          </Box>
          <Box component="div">
            <FieldTitle title="Độ ưu tiên" isRequired={true} />
            <SelectField
              data={priorityOptions}
              form={form}
              placeholder="Nhập độ ưu tiên"
              name="priority"
              label=""
            />
          </Box>
          <Box component="div">
            <FieldTitle title="Liên hệ" isRequired={true} />
            <AutocompleteInput
              multiple={true}
              data={
                contacts
                  ? contacts?.data.map((contact) => ({
                      title: contact.name,
                      value: contact.id
                    }))
                  : []
              }
              form={form}
              name="contactIds"
              onSearchChange={(textSearch) => {
                console.log(textSearch);
              }}
            />
          </Box>
          <Box component="div">
            <FieldTitle title="Chú thích" isRequired={true} />
            <MultilineTextField
              form={form}
              placeholder="Nhập chú thích"
              name="description"
              label=""
              minRows={4}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" variant="outlined" onClick={onClose} />
        <CustomButton
          label="Thêm mới"
          type="submit"
          form="add-publish-info-form"
        />
      </DialogActions>
    </Dialog>
  );
};
