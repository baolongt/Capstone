import 'react-pdf/dist/esm/Page/TextLayer.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, IconButton } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { blobToURL } from '@/utils';

import PdfPagination from './outgoing-doc-pdf-pagination';
import DraggableText from './outgoing-doc-pdf-text-draggable';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({
  saveFile,
  goBack,
  initUrl,
  initText
}: {
  initUrl: string;
  initText: string;
  saveFile: (payload: string) => void;
  goBack: () => void;
}) => {
  const [pdf, setPdf] = useState<string | ArrayBuffer | null>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pageDetails, setPageDetails] = useState<any>(null);
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [position, setPosition] = useState<MouseEvent | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const documentRef = useRef<any>(null);

  useEffect(() => {
    const convertInitUrlToBlob = async () => {
      const response = await fetch(initUrl);
      const blob = await response.blob();
      const blobUrl = await blobToURL(blob);
      setPdf(blobUrl);
    };
    convertInitUrlToBlob();
  }, [initUrl]);

  return (
    <Box sx={{ mx: '0 auto', maxWidth: '100%', maxHeight: '100vh' }}>
      <Box
        sx={{
          maxWidth: 800,
          margin: '0 auto',
          pt: 5
        }}
      >
        <IconButton aria-label="Quay lại" onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <Button
          sx={{ mr: 1 }}
          variant="contained"
          onClick={() => setTextInputVisible(true)}
        >
          Đánh số
        </Button>
        <Button variant="contained" onClick={() => saveFile(pdf as string)}>
          Lưu file
        </Button>
      </Box>
      <Box
        sx={{
          margin: '20px auto',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {pdf ? (
          <Box
            ref={documentRef}
            sx={{
              maxWidth: 1600,
              marginTop: 8,
              border: '1px solid #999'
            }}
          >
            <PdfPagination
              totalPages={totalPages}
              currentPage={pageNum}
              onPageChange={(page) => setPageNum(page)}
            />
            {textInputVisible && (
              <DraggableText
                parentRef={documentRef}
                initialText={initText}
                onCancel={() => setTextInputVisible(false)}
                onEnd={setPosition}
                onSet={async (text: string) => {
                  if (!position) return;
                  const { originalHeight, originalWidth } = pageDetails;
                  const scale = originalWidth / documentRef.current.clientWidth;
                  const y =
                    documentRef.current.clientHeight -
                    (position.y +
                      12 * scale -
                      position.offsetY -
                      documentRef.current.offsetTop);
                  const x =
                    position.x -
                    position.offsetX -
                    documentRef.current.offsetLeft -
                    10;
                  // new XY in relation to actual document size
                  const newY =
                    (y * originalHeight) / documentRef.current.clientHeight;
                  const newX =
                    (x * originalWidth) / documentRef.current.clientWidth;
                  const pdfDoc = await PDFDocument.load(
                    pdf as string | ArrayBuffer | Uint8Array
                  );

                  const pages = pdfDoc.getPages();
                  const currentPage = pages[pageNum];

                  currentPage.drawText(text, {
                    x: newX,
                    y: newY,
                    size: 20 * scale
                  });

                  const pdfBytes = await pdfDoc.save();
                  const blob = new Blob([pdfBytes], {
                    type: 'application/pdf'
                  });

                  const blobUrl = await blobToURL(blob);
                  setPdf(blobUrl);
                  setTextInputVisible(false);
                  setPosition(null);
                }}
              />
            )}
            <Box sx={{ mx: '0 auto', maxWidth: 900 }}>
              <Document
                file={pdf}
                onLoadSuccess={(data) => {
                  setTotalPages(data.numPages);
                }}
              >
                <Page
                  width={800}
                  height={1200}
                  pageNumber={pageNum + 1}
                  renderAnnotationLayer={false}
                  onLoadSuccess={(data) => {
                    setPageDetails(data);
                  }}
                />
              </Document>
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default PDFViewer;
