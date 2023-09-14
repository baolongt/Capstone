import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Stack,
  SxProps,
  Typography
} from '@mui/material';
import * as React from 'react';

import { UploadFile } from '@/models';

import FileCard from './file-card';

export type FileUploadedAccordionProps = {
  files: UploadFile[];
  removeFile: (id: string) => void;
  updateNeedSigned: (id: string) => void;
  sx?: SxProps;
};

const FileUploadedAccordion: React.FC<FileUploadedAccordionProps> = (props) => {
  const { files, removeFile, updateNeedSigned, sx } = props;
  const fileCards = files.map((file, idx) => (
    <Box key={idx} component={Paper} elevation={1}>
      <FileCard
        key={idx}
        file={file}
        removeFile={removeFile}
        updateNeedSigned={updateNeedSigned}
      />
    </Box>
  ));

  return (
    <Accordion
      component={Paper}
      elevation={3}
      sx={sx}
      disabled={files.length === 0}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{files.length} file</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            minHeight: '150px',
            maxHeight: '300px',
            marginRight: '10px',
            overflow: 'auto'
          }}
        >
          <Stack sx={{ px: 1 }} spacing={3}>
            {fileCards}
          </Stack>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default FileUploadedAccordion;
