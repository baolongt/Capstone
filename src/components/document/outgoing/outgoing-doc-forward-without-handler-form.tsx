import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FieldTitle, MultilineTextField } from '@/components/common';
import { validation } from '@/models';

export type WithoutHandlerForwardFormProps = {
  form: UseFormReturn<validation.outgoingDocument.ForwardType, any>;
  isSubmitForm: boolean;
  handleSubmitForm: () => void;
};

export const WithoutHandlerForwardForm: React.FC<
  WithoutHandlerForwardFormProps
> = (props) => {
  const { form, isSubmitForm, handleSubmitForm } = props;

  const { handleSubmit } = form;
  const submitHandler = () => {
    handleSubmitForm();
  };

  return (
    <Stack sx={{ width: '100%', pr: 1 }} spacing={1}>
      <Grid
        container
        sx={{ width: '100%' }}
        spacing={2}
        id="foward-document-form"
      >
        <Grid item xs={12}>
          <FieldTitle title="Ghi chú" />
          <MultilineTextField form={form} name="note" minRows={4} />
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
