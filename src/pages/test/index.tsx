import { Box } from '@mui/material';
import { debounce } from 'lodash';
import React, { Component } from 'react';
import { useForm } from 'react-hook-form';

import { useListUsers } from '@/apis';
import AutocompleteInput from '@/components/common/form-control/autocomplete';
import { DEBOUND_SEARCH_TIME } from '@/constants';
import { BaseTableQueryParams } from '@/types';

const TestPage = () => {
  const [queryParams, setQueryParams] = React.useState<BaseTableQueryParams>({
    page: 1,
    size: 10_000,
    search: ''
  });
  const { data, isLoading } = useListUsers({ queryParams });
  const form = useForm({
    defaultValues: {
      user: []
    }
  });

  const { handleSubmit } = form;

  const onSearchUser = (textSearch: string) => {
    return setQueryParams({ ...queryParams, search: textSearch });
  };
  const debounceSearch = debounce(onSearchUser, DEBOUND_SEARCH_TIME);
  const onSubmit = () => {
    console.log('submit...');
  };
  return (
    <Box component="form" id="add-user-form" onSubmit={handleSubmit(onSubmit)}>
      <AutocompleteInput
        data={
          data?.data.map((user) => {
            return {
              title: user.name,
              value: user.id
            };
          }) ?? []
        }
        name="user"
        form={form}
        onSearchChange={debounceSearch}
      />
    </Box>
  );
};

export default TestPage;
