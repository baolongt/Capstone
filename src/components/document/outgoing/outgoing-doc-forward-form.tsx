import { Grid, Stack } from '@mui/material';
import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useListLeaders } from '@/apis/department/getListLeader';
import { FieldTitle, MultilineTextField } from '@/components/common';
import AutocompleteInput from '@/components/common/form-control/autocomplete';
import { user, validation } from '@/models';

export type ForwardFormProps = {
  form: UseFormReturn<validation.outgoingDocument.ForwardType, any>;
};

export const ForwardForm: React.FC<ForwardFormProps> = (props) => {
  const { form } = props;
  const [leaders, setLeaders] = React.useState<user.User[]>([]);

  const { data } = useListLeaders();

  React.useEffect(() => {
    if (data) {
      setLeaders(data);
    }
  }, [data]);

  const handleSearchLeader = (text: string) => {
    const res = data ? data.filter((item) => item.name.includes(text)) : [];
    setLeaders(res);
  };

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
              leaders?.map(({ name, id }) => {
                return {
                  title: name,
                  value: id
                };
              }) ?? []
            }
            name="newHandlerId"
            form={form}
            onSearchChange={handleSearchLeader}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldTitle title="Ghi chú" />
          <MultilineTextField form={form} name="newNote" minRows={4} />
        </Grid>
      </Grid>
    </Stack>
  );
};
