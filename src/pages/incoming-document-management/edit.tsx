import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper } from '@mui/material';
import * as React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useEditIncomingDocument } from '@/apis/incomingDocument/editDocument';
import { useGetOneDocument } from '@/apis/incomingDocument/getOneDocument';
import { Loading } from '@/components/common';
import AppDocViewer from '@/components/common/document-viewer';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import EditForm from '@/components/document/incoming/incoming-doc-edit-form';
import { OutgoingDocumentStatus } from '@/constants';
import { incomingDocument, validation } from '@/models';
import { convertDetailToEditForm } from '@/models/incomingDocument';

const EditIncomingDocumentPage = () => {
  const { id } = useParams<{ id: string }>();
  const [docPreview, setDocPreview] = React.useState(false);
  const [docPreviewData, setDocPreviewData] = React.useState<{ uri: string }[]>(
    []
  );
  const navigate = useNavigate();

  const handleClosePeview = () => {
    setDocPreview(false);
  };

  const watchAttachment = (url: string) => {
    setDocPreviewData([{ uri: url }]);
    setDocPreview(true);
  };

  const { data, isLoading } = useGetOneDocument(id ? parseInt(id) : -1);

  const { mutate: editDocument } = useEditIncomingDocument({
    onSuccess: () => {
      toast.success('Chỉnh sửa văn bản đi thành công');
      navigate('/incoming-documents');
    },
    onError: (err) => {
      if (err) {
        toast.error(err);
      } else toast.error('Chỉnh sửa văn bản đi thất bại');
    },
    id: id || ''
  });

  const form = useForm({
    defaultValues: {},
    resolver: yupResolver(validation.outgoingDocument.editSchema)
  }) as unknown as UseFormReturn<
    incomingDocument.EditIncomingDocument,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;

  const { getValues } = form;

  const handleSave = () => {
    editDocument({
      id: id || '',
      editObj: getValues()
    });
  };

  React.useEffect(() => {
    if (data) {
      form.reset(convertDetailToEditForm(data), { keepDirty: false });
    }
  }, [data, form]);

  if (isLoading) {
    return <Loading />;
  }

  if (data?.documentStatus != OutgoingDocumentStatus.EDITING)
    navigate('/incoming-documents/' + id);

  return (
    <>
      <Box>
        <PageHeader>
          <Box>
            <PageTitle label="Chỉnh sửa" />
          </Box>
        </PageHeader>
        <Box
          sx={{
            mx: 'auto',
            width: '1080px',
            mt: 3,
            pt: 3,
            px: 2,
            minHeight: '80vh'
          }}
          component={Paper}
        >
          <EditForm
            watchAttachment={watchAttachment}
            handleSave={handleSave}
            form={form}
            data={getValues()}
          />
        </Box>
      </Box>
      <AppDocViewer
        docs={docPreviewData}
        open={docPreview}
        handleClose={handleClosePeview}
      />
    </>
  );
};

export default EditIncomingDocumentPage;
