import AttachFileIcon from '@mui/icons-material/AttachFile';
import DownloadIcon from '@mui/icons-material/Download';
import DrawIcon from '@mui/icons-material/Draw';
import ImageIcon from '@mui/icons-material/Image';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Chip,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import React from 'react';
import { FaFileExcel, FaFilePdf, FaFileWord } from 'react-icons/fa';

import useAuth from '@/hooks/useAuth';
import { Attachment } from '@/models';
import { JobPosition } from '@/models/user';

export type AttachmentCardProps = {
  attachment: Attachment;
  watchAttachment?: (id: string) => void;
  signAttachment?: (id: string) => void;
  addNumber?: (id: string, url: string) => void;
  isUploaded?: boolean;
};

export const AttachmentCard: React.FC<AttachmentCardProps> = (props) => {
  const { attachment, watchAttachment, signAttachment, addNumber, isUploaded } =
    props;
  const {
    authState: { user }
  } = useAuth();
  const size = parseInt(attachment.size);
  const getAttachmentIcon = () => {
    if (attachment.mimeType.startsWith('image/')) {
      return <ImageIcon style={{ fontSize: '2rem' }} />;
    } else {
      switch (attachment.mimeType.toLowerCase()) {
        case 'application/pdf':
          return <FaFilePdf style={{ fontSize: '2rem' }} />;
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return <FaFileExcel style={{ fontSize: '2rem' }} />;
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return <FaFileWord style={{ fontSize: '2rem' }} />;
        default:
          return <AttachFileIcon style={{ fontSize: '2rem' }} />;
      }
    }
  };
  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Box sx={{ maxHeight: '100%', overflow: 'auto', mr: 1 }}>
          <Box style={{ marginTop: 12 }}>{getAttachmentIcon()}</Box>
        </Box>
        <Stack
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '80%',
            maxWidth: '80%',
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
          </Typography>
          <Box>
            <Typography gutterBottom variant="caption">
              {size > 100000
                ? `${(size / 1000000).toFixed(2)} MB`
                : `${(size / 1000).toFixed(2)} KB`}
            </Typography>
            {attachment.needSigned && (
              <Chip
                label="Cần ký số"
                color="primary"
                size="small"
                sx={{ ml: 2 }}
              />
            )}
            {isUploaded && (
              <Chip
                label="Đã được tải lên"
                color="success"
                size="small"
                sx={{ ml: 2 }}
              />
            )}
          </Box>
        </Stack>
        {attachment.mimeType === 'application/pdf' &&
          user?.jobPositionID &&
          user.jobPositionID === JobPosition.VAN_THU && (
            <Tooltip title="Đánh số văn bản">
              <IconButton
                color="primary"
                onClick={() => addNumber?.(attachment.name, attachment.url)}
              >
                <DrawIcon />
              </IconButton>
            </Tooltip>
          )}
        {attachment.needSigned && user?.departmentId === 1 && (
          <Tooltip title="Ký số">
            <IconButton
              color={'success'}
              onClick={() => signAttachment?.(attachment.name)}
            >
              <DrawIcon />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Xem">
          <IconButton
            aria-label="xem"
            onClick={() => watchAttachment?.(attachment.url)}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Tải xuống">
          <Link
            sx={{ color: 'inherit' }}
            href={attachment.url}
            underline="none"
            component={IconButton}
          >
            <DownloadIcon />
          </Link>
        </Tooltip>
      </Stack>
    </Box>
  );
};
