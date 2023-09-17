import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FieldTitle, MultilineTextField } from '@/components/common';
import { validation } from '@/models';

export type WithoutHandlerForwardFormProps = {
  form: UseFormReturn<validation.outgoingDocument.ForwardType, any>;
};

export const WithoutHandlerForwardForm: React.FC<
  WithoutHandlerForwardFormProps
> = (props) => {
  const { form } = props;

  return (
    <Stack sx={{ width: '100%', pr: 1 }} spacing={1}>
      <Grid
        container
        sx={{ width: '100%' }}
        spacing={2}
        id="foward-document-form"
      >
        <Grid item xs={12}>
          <FieldTitle title="Ghi chú" isRequired={true} />
          <MultilineTextField form={form} name="newNote" minRows={4} />
        </Grid>
      </Grid>
    </Stack>
  );
};
