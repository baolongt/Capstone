import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { Box, Button, Grid, Input, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { connect, send, setUserName, uploadFile } from '@/apis';
import { UploadFile } from '@/models';

const TestPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
    console.log('file', file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      // Perform file upload logic here
      console.log(`Uploading file: ${selectedFile.name}`);
      const res = await uploadFile([
        new UploadFile({
          fileObj: selectedFile
        })
      ]);
      setFileUrl(res[0].url);
      setFileId(res[0].name);
    }
  };

  const handleDigitalSign = async () => {
    const isConnected = await connect();

    if (isConnected) {
      await setUserName('test');
      await send(fileId as string);
    } else {
      toast.error('Không thể kết nối đến thiết bị ký số');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {!selectedFile || !fileUrl ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Upload a file</Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              type="file"
              inputProps={{ accept: '.pdf' }}
              onChange={handleFileSelect}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleFileUpload}>
              Upload
            </Button>
          </Grid>
        </Grid>
      ) : (
        <>
          <Button variant="contained" onClick={() => connect()}>
            Kết nối chữ ký số
          </Button>
          <Button variant="contained" onClick={handleDigitalSign}>
            Ký số
          </Button>

          <DocViewer
            style={{
              width: '100%',
              height: '85vh'
            }}
            documents={[{ uri: fileUrl as string }]}
            pluginRenderers={DocViewerRenderers}
          />
        </>
      )}
    </Box>
  );
};

export default TestPage;
