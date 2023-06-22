import React from 'react';
import CreateDocumentForm from '../../components/document/outgoing/CreateDocumentForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { outgoingDocument } from '../../models';
import { createValidation } from './validation';
const CreateOutgoingDocumentPage: React.FC = () => {
  const form = useForm({
    defaultValues: {
      documentFieldId: 1,
      documentTypeId: 1,
      status: 1,
      files: []
    },
    resolver: yupResolver(createValidation.validationSchema)
  });
  const { handleSubmit, reset } = form;

  const onSubmitHandler = (
    data: Partial<outgoingDocument.CreateOutgoingDocument>
  ) => {
    console.log('data on create page', data);
    reset();
  };

  return (
    <>
      <CreateDocumentForm
        form={form}
        handleSubmit={handleSubmit}
        onSubmitHandler={onSubmitHandler}
      />
    </>
  );
};

export default CreateOutgoingDocumentPage;
