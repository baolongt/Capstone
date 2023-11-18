import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, Box, Button, IconButton, Paper } from '@mui/material';
import React from 'react';

type AppDocViewerProps = {
  open: boolean;
  handleClose: () => void;
  docs: { uri: string }[];
};
//
const AppDocViewer: React.FC<AppDocViewerProps> = ({
  docs,
  open,
  handleClose
}) => {
  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={open}
        onClick={handleClose}
      >
        <Box
          component={Paper}
          sx={{ height: '90vh', width: '90vw', mx: 'auto' }}
        >
          <Box sx={{ display: 'flex', p: 2, borderBottom: '1px dashed grey' }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <DocViewer
            style={{
              width: '100%',
              height: '85vh'
            }}
            documents={docs}
            pluginRenderers={DocViewerRenderers}
          />
        </Box>
      </Backdrop>
    </>
  );
};

export default AppDocViewer;
