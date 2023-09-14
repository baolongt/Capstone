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

import { Attachment, UploadFile } from '@/models';

import { AttachmentCard } from './outgoing-doc-detail-attachment-accordion-atttachment-card';

export type DetailAttachmentAccordionProps = {
  attachments: Attachment[];
  sx?: SxProps;
  watchAttachment: (id: string) => void;
  signAttachment: (id: string) => void;
};

export const DetailAttachmentAccordion: React.FC<
  DetailAttachmentAccordionProps
> = (props) => {
  const { attachments, watchAttachment, signAttachment, sx } = props;

  const attachmentCards = attachments.map((att, idx) => (
    <Box key={idx} component={Paper} elevation={1}>
      <AttachmentCard
        key={idx}
        attachment={att}
        watchAttachment={watchAttachment}
        signAttachment={signAttachment}
      />
    </Box>
  ));
  return (
    <Accordion component={Paper} elevation={3}>
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
          <Stack sx={{ px: 1 }} spacing={3}>
            {attachmentCards}
          </Stack>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
