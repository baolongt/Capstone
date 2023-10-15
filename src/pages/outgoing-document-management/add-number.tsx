import queryString from 'query-string';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGetPublishNumber, useUploadSignedDocument } from '@/apis';
import { Loading } from '@/components/common';
import PDFViewer from '@/components/document/outgoing/outgoing-doc-pdf-viewer';

const AddNumberPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const attachmentId = queryParams.attachmentId;
  const url = queryParams.url;

  const { data, isLoading } = useGetPublishNumber();

  const handleGoBack = () => {
    navigate(`/outgoing-documents/${id}`);
  };

  const { mutate: uploadFile } = useUploadSignedDocument({
    onSuccess: () => {
      toast.success('Lưu thành công');
      handleGoBack();
    },
    onError: () => {
      toast.success('Lưu thất bại');
    },
    fileId: (attachmentId as string) ?? ''
  });

  const handleSaveFile = (payload: string) => {
    const base64data = payload.split(',')[1];
    console.log(base64data);
    uploadFile({
      payload: base64data,
      fileId: (attachmentId as string) ?? ''
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <div>Not found</div>;
  }

  return (
    <PDFViewer
      goBack={handleGoBack}
      saveFile={handleSaveFile}
      initText={String(data)}
      initUrl={(url as string) ?? ''}
    />
  );
};

export default AddNumberPage;
