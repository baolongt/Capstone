import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Stack,
  SxProps,
  Typography,
  useTheme
} from '@mui/material';
import * as React from 'react';

import { AttachmentCard } from '@/components/document/outgoing/outgoing-doc-detail-attachment-accordion-atttachment-card';
import { UploadFile } from '@/models';

import { DragAndDropBoxValueType } from '.';
import FileCard from './file-card';

export type FileUploadedAccordionProps = {
  files: DragAndDropBoxValueType[];
  removeFile: (id: string) => void;
  updateNeedSigned: (id: string) => void;
  watchAttachment?: (id: string) => void;
  signAttachment?: (id: string) => void;
  sx?: SxProps;
};

const FileUploadedAccordion: React.FC<FileUploadedAccordionProps> = (props) => {
  const {
    files,
    removeFile,
    updateNeedSigned,
    watchAttachment,
    signAttachment,
    sx
  } = props;
  const theme = useTheme();

  const fileCards = files.map((file, idx) => {
    return (
      <Box
        key={idx}
        component={Paper}
        elevation={1}
        sx={{ backgroundColor: theme.palette.secondary.light, py: 2, px: 1 }}
      >
        {file instanceof UploadFile ? (
          <FileCard
            key={idx}
            file={file}
            removeFile={removeFile}
            updateNeedSigned={updateNeedSigned}
          />
        ) : (
          <AttachmentCard
            isUploaded={true}
            attachment={file}
            watchAttachment={watchAttachment}
            signAttachment={signAttachment}
          />
        )}
      </Box>
    );
  });

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
