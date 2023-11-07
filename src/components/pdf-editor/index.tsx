import { toast } from 'react-toastify';

import { useUploadSignedDocument } from '@/apis';
import PDFViewer from '@/components/document/outgoing/outgoing-doc-pdf-viewer';

type PDFEditorProps = {
  attachmentId: string;
  url: string;
};

const PDFEditor = ({ attachmentId, url }: PDFEditorProps) => {
  const handleGoBack = () => {
    // navigate(`/outgoing-documents/${id}`);
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

  return (
    <PDFViewer
      goBack={handleGoBack}
      saveFile={handleSaveFile}
      initText={String('1')}
      initUrl={(url as string) ?? ''}
    />
  );
};

export default PDFEditor;
