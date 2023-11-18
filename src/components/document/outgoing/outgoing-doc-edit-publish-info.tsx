import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useEditPublishInfo, useGetPublishNumber } from '@/apis';
import { useListContacts } from '@/apis/contact';
import {
  CustomButton,
  DatePickerField,
  FieldTitle,
  InputField,
  SelectField
} from '@/components/common';
import AutocompleteInput from '@/components/common/form-control/autocomplete';
import { addPublishInfoSchema } from '@/components/dialogs/validations';
import { DEFAULT_PAGE_WIDTH, priorityOptions } from '@/constants';

type EditPublishInfoProps = {
  docId?: number;
};

interface PublishInfoPayload {
  outgoingDocumentId: number;
  outgoingNumber: number;
  outgoingNotation: string;
  contactListIds: number[];
  priority: number;
  dueDate: Date;
  issuedAmount: number;
}

export const EditPublishInfo = ({ docId }: EditPublishInfoProps) => {
  const form = useForm<PublishInfoPayload>({
    defaultValues: {
      outgoingDocumentId: 0,
      outgoingNumber: 0,
      outgoingNotation: ''
    },
    resolver: yupResolver(addPublishInfoSchema) as Resolver<
      PublishInfoPayload,
      any
    >
  });

  const { handleSubmit } = form;
  const { mutate: updatePublishInfoMutate } = useEditPublishInfo({
    onSuccess: () => {
      toast.success('Cập nhật thông tin thành công');
      handleClose();
    },
    onError: () => {
      toast.error('Cập nhật thông tin thất bại');
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
    form.reset();
  };

  const onSubmit = async (payload: PublishInfoPayload) => {
    await refetch();
    updatePublishInfoMutate({
      ...payload,
      outgoingDocumentId: docId || -1,
      outgoingNumber: publishNumber || -1,
      dueDate: payload.dueDate.toISOString()
    });
    handleNextStep();
  };

  return (
    <Box sx={{ mx: 'auto', width: DEFAULT_PAGE_WIDTH, p: 2 }} component={Paper}>
      <Typography variant="h6" fontWeight={600}>
        Thêm thông tin phát hành
      </Typography>

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
            name="outgoingNotation"
            label=""
          />
        </Box>
        <Box component="div">
          <FieldTitle title="Số bản phát hành" isRequired={true} />
          <InputField
            form={form}
            placeholder="Nhập số bản phát hành"
            name="issuedAmount"
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
            filterSelectedOptions={true}
            form={form}
            name="contactListIds"
            onSearchChange={(textSearch) => {
              console.log(textSearch);
            }}
          />
        </Box>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <CustomButton
          type="submit"
          label="Thêm mới"
          form="add-publish-info-form"
        />
      </Box>
    </Box>
  );
};
