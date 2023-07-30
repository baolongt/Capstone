import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

import { useUploadFile, useUploadForm } from '@/apis/outgoingDocument';
import { CreateOutgoingDocumentDialog } from '@/components/dialogs';
import CreateDocumentForm from '@/components/document/outgoing/CreateDocumentForm';
import { UploadFile } from '@/models';
import { validation } from '@/types';

const CreateOutgoingDocumentPage: React.FC = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false);
  const [currentUploadStep, setCurrentUploadStep] = React.useState(0);

  const {
    mutate: uploadFiles,
    data: filesData,
    isSuccess: isUploadFileSuccess
  } = useUploadFile({});
  const { mutate: uploadForm, isSuccess: isUploadFormSuccess } = useUploadForm({
    onSuccess: () => {
      setUploadDialogOpen(false);
    }
  });

  const handleUploadDialogOpen = () => {
    setUploadDialogOpen(!uploadDialogOpen);
  };

  const form = useForm({
    defaultValues: {
      epitomize: '',
      documentField: 1,
      documentTypeId: 1,
      isRepliedDocument: false,
      status: 1,
      note: '',
      files: [] as UploadFile[]
    },
    resolver: yupResolver(validation.outgoingDocument.createSchema)
  }) as UseFormReturn<
    validation.outgoingDocument.CreateType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;

  const { getValues, watch, reset } = form;
  const files: UploadFile[] | undefined = watch('files');

  const handleUploadFiles = () => {
    if (files && files.length > 0) {
      uploadFiles(files);
    }
  };

  // 1. upload file when open dialog
  useEffect(() => {
    setTimeout(() => {
      if (uploadDialogOpen) {
        handleUploadFiles();
      }
    }, 1000);
  }, [uploadDialogOpen]);

  // 2. mapping response upload file to UploadFile and bind to form, go to next step
  useEffect(() => {
    if (filesData && files) {
      for (let idx = 0; idx < filesData.length; idx++) {
        files[idx].setNameAndUrl(filesData[idx].name, filesData[idx].url);
      }
      if (isUploadFileSuccess) {
        setCurrentUploadStep(1);
      }
    }
  }, [filesData]);

  // 3. submit form with files
  useEffect(() => {
    if (currentUploadStep === 1) {
      uploadForm(getValues());
    }
  }, [currentUploadStep]);

  // clean up state when upload form success
  useEffect(() => {
    if (isUploadFormSuccess) {
      reset();
      setCurrentUploadStep(0);
    }
  }, [isUploadFormSuccess]);

  return (
    <>
      <CreateDocumentForm
        handleUploadDialogOpen={handleUploadDialogOpen}
        form={form}
      />
      <CreateOutgoingDocumentDialog
        curentStep={currentUploadStep}
        isOpen={uploadDialogOpen}
      />
    </>
  );
};

export default CreateOutgoingDocumentPage;
