import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
import { debounce } from 'lodash';
import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useListUsers } from '@/apis';
import { FieldTitle, MultilineTextField } from '@/components/common';
import AutocompleteInput from '@/components/common/form-control/autocomplete';
import { DEBOUND_SEARCH_TIME } from '@/constants';
import { validation } from '@/models';
import { BaseTableQueryParams } from '@/types';

export type ForwardFormProps = {
  form: UseFormReturn<validation.outgoingDocument.ForwardType, any>;
  isSubmitForm: boolean;
  handleSubmitForm: () => void;
};

export const ForwardForm: React.FC<ForwardFormProps> = (props) => {
  const { form, isSubmitForm, handleSubmitForm } = props;

  const { handleSubmit } = form;
  const submitHandler = () => {
    handleSubmitForm();
  };

  const [queryParams, setQueryParams] = React.useState<BaseTableQueryParams>({
    page: 1,
    size: 10_000,
    search: ''
  });
  const { data } = useListUsers({ queryParams });
  const users = data?.data;

  const onSearchUser = (textSearch: string) => {
    return setQueryParams({ ...queryParams, search: textSearch });
  };

  const debounceSearch = debounce(onSearchUser, DEBOUND_SEARCH_TIME);

  return (
    <Stack sx={{ width: '100%', pr: 1 }} spacing={1}>
      <Grid
        container
        sx={{ width: '100%' }}
        spacing={2}
        component="form"
        id="foward-document-form"
      >
        <Grid item xs={12}>
          <FieldTitle title="Người nhận" />
          <AutocompleteInput
            data={
              users?.map(({ name, id }) => {
                return {
                  title: name,
                  value: id
                };
              }) ?? []
            }
            name="newHandlerId"
            form={form}
            onSearchChange={debounceSearch}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldTitle title="Ghi chú" />
          <MultilineTextField form={form} name="newNote" minRows={4} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <LoadingButton
          sx={{ ml: 3, mt: 2 }}
          variant="contained"
          color="primary"
          loading={isSubmitForm}
          onClick={handleSubmit(submitHandler)}
        >
          Chuyển
        </LoadingButton>
      </Grid>
    </Stack>
  );
};
