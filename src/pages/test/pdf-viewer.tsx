import PDFViewer from '@/components/document/outgoing/outgoing-doc-pdf-viewer';

const TestPdfViwer = () => {
  return (
    <PDFViewer
      initText="ABC-123"
      initUrl="https://ductt-capstone-bucket.s3.ap-southeast-1.amazonaws.com/tmpMDVAcK.tmp_Man's Search For Meaning.pdf"
    />
  );
};

export default TestPdfViwer;
