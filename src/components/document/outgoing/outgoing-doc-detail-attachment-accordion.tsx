import {
  Box,
  Paper,
  Stack,
  SxProps,
  Typography,
  useTheme
} from '@mui/material';
import * as React from 'react';

import { Attachment } from '@/models';

import { AttachmentCard } from './outgoing-doc-detail-attachment-accordion-atttachment-card';

export type DetailAttachmentAccordionProps = {
  attachments: Attachment[];
  sx?: SxProps;
  watchAttachment: (id: string) => void;
  signAttachment: (id: string) => void;
  addNumber?: (id: string, url: string) => void;
};

export const DetailAttachmentAccordion: React.FC<
  DetailAttachmentAccordionProps
> = (props) => {
  const { attachments, watchAttachment, signAttachment, addNumber, sx } = props;
  const theme = useTheme();

  const attachmentCards = attachments.map((att, idx) => (
    <Box
      key={idx}
      sx={{ backgroundColor: theme.palette.secondary.light, py: 2, px: 1 }}
    >
      <AttachmentCard
        key={idx}
        attachment={att}
        watchAttachment={watchAttachment}
        signAttachment={signAttachment}
        addNumber={addNumber}
      />
    </Box>
  ));
  return (
    <Box component={Paper} elevation={2} sx={sx}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        Tệp đính kèm {'  '}
        <Typography component="span">{attachments.length} tệp</Typography>
      </Typography>
      <Box component="div" sx={{}}>
        <Stack sx={{ px: 1 }} spacing={3}>
          {attachmentCards}
        </Stack>
      </Box>
    </Box>
  );
};
