import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  SxProps,
  Typography
} from '@mui/material';
import * as React from 'react';

import { Attachment, UploadFile } from '@/models';

import { AttachmentCard } from './outgoing-doc-detail-attachment-accordion-atttachment-card';

export type DetailAttachmentAccordionProps = {
  attachments: Attachment[];
  sx?: SxProps;
  removeAttachment: (id: string) => void;
  signAttachment: (id: string) => void;
};

export const DetailAttachmentAccordion: React.FC<
  DetailAttachmentAccordionProps
> = (props) => {
  const { attachments, removeAttachment, signAttachment, sx } = props;

  const attachmentCards = attachments.map((att, idx) => (
    <Box key={idx} component="div" sx={{ paddingLeft: 1, paddingRight: 1 }}>
      <AttachmentCard
        key={idx}
        attachment={att}
        removeAttachment={removeAttachment}
        signAttachment={signAttachment}
      />
    </Box>
  ));
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={sx}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Tệp đính kèm {'  '}
          <Typography component="span">{attachments.length} tệp</Typography>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="div"
          sx={{
            minHeight: '250px',
            maxHeight: '250px',
            marginRight: '10px',
            overflowY: 'scroll'
          }}
        >
          <Stack spacing={3}>{attachmentCards}</Stack>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
