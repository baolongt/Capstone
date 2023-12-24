import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Paper, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useEditPublishInfo, useGetPublishNumber } from '@/apis';
import { useListContacts } from '@/apis/contact';
import { useGetOneDocument } from '@/apis/outgoingDocument/getOneDocument';
import {
  DatePickerField,
  FieldTitle,
  InputField,
  Loading,
  SelectField
} from '@/components/common';
import AutocompleteInput from '@/components/common/form-control/autocomplete';
import { addPublishInfoSchema } from '@/components/dialogs/validations';
import { priorityOptions } from '@/constants';

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
  const { data, isLoading } = useGetOneDocument(docId ? docId : -1);
  const { id } = useParams<{ id: string }>();
  const form = useForm<PublishInfoPayload>({
    defaultValues: {},
    resolver: yupResolver(addPublishInfoSchema) as Resolver<
      PublishInfoPayload,
      any
    >
  });

  useEffect(() => {
    if (data && data.outgoingPublishInfo) {
      console.log({
        outgoingDocumentId: data.id,
        outgoingNumber: data.outgoingPublishInfo.outgoingNumber,
        outgoingNotation: data.outgoingPublishInfo.outgoingNotation,
        contactListIds: data.outgoingPublishInfo.contactLists.map(
          (cl) => cl.id
        ),
        priority: data.outgoingPublishInfo.priority,
        dueDate: dayjs(data.outgoingPublishInfo.dueDate).toDate()
      });
      form.reset(
        {
          outgoingDocumentId: data.id,
          outgoingNumber: data.outgoingPublishInfo.outgoingNumber,
          outgoingNotation: data.outgoingPublishInfo.outgoingNotation,
          contactListIds: data.outgoingPublishInfo.contactLists.map(
            (cl) => cl.id
          ),
          priority: data.outgoingPublishInfo.priority,
          dueDate: dayjs(data.outgoingPublishInfo.dueDate).toDate(),
          issuedAmount: data.outgoingPublishInfo.issuedAmount
        },
        {
          keepDirty: false
        }
      );
    }
  }, [data]);

  const { handleSubmit } = form;
  const { mutate: updatePublishInfoMutate, isLoading: isSubmiting } =
    useEditPublishInfo({
      onSuccess: () => {
        toast.success('Cập nhật thông tin thành công');
        handleClose();
      },
      onError: () => {
        toast.error('Cập nhật thông tin thất bại');
      },
      id: id || ''
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
  };

  const defaultValue = _.intersectionBy(
    data?.outgoingPublishInfo?.contactLists || [],
    contacts?.data || [],
    'id'
  );

  if (isLoading) return <Loading />;

  return (
    <Box>
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
            defaultValue={defaultValue.map((cl) => ({
              title: cl.name,
              value: cl.id
            }))}
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
        <LoadingButton
          loading={isSubmiting}
          variant="contained"
          type="submit"
          form="add-publish-info-form"
        >
          Lưu
        </LoadingButton>
      </Box>
    </Box>
  );
};
