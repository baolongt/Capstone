import React, { useState } from 'react';
import CreateDocumentForm from '../../components/document/outgoing/CreateDocumentForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { outgoingDocument } from '../../models';
import { createValidation } from './validation';
const CreateOutgoingDocumentPage: React.FC = () => {
  const form = useForm({
    defaultValues: {
      epitomize: '',
      documentFieldId: 1,
      documentTypeId: 1,
      status: 1,
      note: '',
      files: []
    },
    resolver: yupResolver(createValidation.validationSchema)
  });
  const {
    handleSubmit,
    formState: { errors },
    reset
  } = form;

  const onSubmitHandler = (
    data: Partial<outgoingDocument.CreateOutgoingDocument>
  ) => {
    console.log('data on create page', data);
    console.log('erros', errors);
    reset();
  };

  const [input, setInput] = useState<
    Partial<outgoingDocument.CreateOutgoingDocument>
  >({});

  return (
    <>
      <CreateDocumentForm
        form={form}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmitHandler={onSubmitHandler}
        input={input}
        setInput={setInput}
      />
    </>
  );
};

export default CreateOutgoingDocumentPage;
