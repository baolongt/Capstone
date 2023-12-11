/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { blobToURL } from '@/utils';

import PdfPagination from './outgoing-doc-pdf-pagination';
import DraggableText from './outgoing-doc-pdf-text-draggable';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PDFViewer = ({
  saveFile,
  initUrl,
  initText,
  isUploadingFile
}: {
  initUrl: string;
  initText: string;
  saveFile: (payload: string) => void;
  isUploadingFile: boolean;
}) => {
  const [pdf, setPdf] = useState<string | ArrayBuffer | null>();

  const [textInputVisible, setTextInputVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0
  });

  const containerRef = useRef<any>(null);
  const docRef = useRef<any>(null);

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
    <Box sx={{ mx: '0 auto', maxWidth: '100%', minHeight: '100vh' }}>
      <Box
        sx={{
          maxWidth: 800,
          margin: '0 auto',
          pt: 5
        }}
      >
        <Button
          sx={{ mr: 1 }}
          variant="contained"
          onClick={() => setTextInputVisible(true)}
        >
          Đánh số
        </Button>
        <LoadingButton
          variant="contained"
          loading={isUploadingFile}
          onClick={() => saveFile(pdf as string)}
        >
          Lưu file
        </LoadingButton>
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
            ref={containerRef}
            sx={{
              width: '100%',
              px: 25,
              border: '1px solid #999',
              backgroundColor: '#ddd'
            }}
          >
            <PdfPagination
              totalPages={totalPages}
              currentPage={pageNum}
              onPageChange={(page) => setPageNum(page)}
            />
            {textInputVisible && (
              <DraggableText
                docRef={docRef}
                parentRef={containerRef}
                initialText={initText}
                onCancel={() => setTextInputVisible(false)}
                onEnd={setPosition}
                onSet={async (text: string) => {
                  if (!position) return;

                  const pdfDoc = await PDFDocument.load(
                    pdf as string | ArrayBuffer | Uint8Array
                  );
                  const pages = pdfDoc.getPages();
                  const currentPage = pages[pageNum];

                  // scale page size compared to container size
                  const xScale =
                    currentPage.getSize().width / docRef.current.clientWidth;
                  const yScale =
                    currentPage.getSize().height / docRef.current.clientHeight;

                  // position from top left * scale
                  const newX = position.x * xScale;
                  // revert position from bottom left * scale
                  const newY =
                    currentPage.getSize().height - position.y * yScale - 50; //some number to fix wrong position

                  currentPage.drawText(text, {
                    x: newX,
                    y: newY,
                    size: 20 * xScale
                  });

                  const pdfBytes = await pdfDoc.save();
                  const blob = new Blob([pdfBytes], {
                    type: 'application/pdf'
                  });

                  const blobUrl = await blobToURL(blob);
                  setPdf(blobUrl);
                  setTextInputVisible(false);
                  setPosition({ x: 0, y: 0 });
                }}
              />
            )}
            <Document
              file={pdf}
              renderMode="canvas"
              onLoadSuccess={(data) => {
                setTotalPages(data.numPages);
              }}
            >
              <Page
                inputRef={docRef}
                // canvasBackground="transparent"
                devicePixelRatio={1}
                width={800}
                height={1200}
                pageNumber={pageNum + 1}
                renderAnnotationLayer={false}
              />
            </Document>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default PDFViewer;
