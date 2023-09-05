import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import DrawIcon from '@mui/icons-material/Draw';
import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import React from 'react';
import { FaFileExcel, FaFilePdf, FaFileWord } from 'react-icons/fa';

import { Attachment } from '@/models';

export type AttachmentCardProps = {
  attachment: Attachment;
  removeAttachment: (id: string) => void;
  signAttachment: (id: string) => void;
};

export const AttachmentCard: React.FC<AttachmentCardProps> = (props) => {
  const { attachment, removeAttachment, signAttachment } = props;
  const size = parseInt(attachment.size);
  const getAttachmentIcon = () => {
    if (attachment.mimeType.startsWith('image/')) {
      return <ImageIcon />;
    } else {
      switch (attachment.mimeType.toLowerCase()) {
        case 'application/pdf':
          return <FaFilePdf />;
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return <FaFileExcel />;
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return <FaFileWord />;
        default:
          return <AttachFileIcon />;
      }
    }
  };
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Box component="div" style={{ marginTop: 12 }}>
            {getAttachmentIcon()}
          </Box>
          <Stack
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '70%',
              maxWidth: '70%',
              height: '50px',
              whiteSpace: 'nowrap'
            }}
          >
            <Typography
              gutterBottom
              variant="subtitle1"
              sx={{
                minWidth: '100%'
              }}
            >
              {attachment.name}
              {attachment.needSigned && (
                <Chip label="Cần ký số" size="small" sx={{ ml: 2 }} />
              )}
            </Typography>
            <Typography gutterBottom variant="caption">
              {size > 100000
                ? `${(size / 1000000).toFixed(2)} MB`
                : `${(size / 1000).toFixed(2)} KB`}
            </Typography>
          </Stack>
          <Tooltip title="Ký số">
            <IconButton
              color={attachment.needSigned ? 'success' : 'primary'}
              onClick={() => signAttachment(attachment.id)}
            >
              <DrawIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá">
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => removeAttachment(attachment.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
};
