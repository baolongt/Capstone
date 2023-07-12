import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import CreateDocumentForm from '../../components/document/outgoing/CreateDocumentForm';
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

  return (
    <>
      <CreateDocumentForm form={form} />
    </>
  );
};

export default CreateOutgoingDocumentPage;
