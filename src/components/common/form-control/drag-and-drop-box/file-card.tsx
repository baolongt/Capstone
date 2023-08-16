import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import DrawIcon from '@mui/icons-material/Draw';
import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { FaFileExcel, FaFilePdf, FaFileWord } from 'react-icons/fa';

import { UploadFile } from '@/models';

export type FileCardProps = {
  file: UploadFile;
  removeFile: (id: string) => void;
  updateNeedSigned: (id: string) => void;
};

const FileCard: React.FC<FileCardProps> = (props) => {
  const {
    // get real File
    file: { fileObj, id, needSigned },
    removeFile,
    updateNeedSigned
  } = props;

  if (!fileObj) return null;

  const fileIcon = () => {
    if (fileObj.type.startsWith('image/')) {
      return <ImageIcon />;
    } else {
      switch (fileObj.type.toLowerCase()) {
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
            {fileIcon()}
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
              {fileObj.name}
            </Typography>
            <Typography gutterBottom variant="caption">
              {fileObj.size > 100000
                ? `${(fileObj.size / 1000000).toFixed(2)} MB`
                : `${(fileObj.size / 1000).toFixed(2)} KB`}
            </Typography>
          </Stack>
          <Tooltip title="Đánh dấu cần ký số">
            <IconButton
              aria-label="delete"
              color={needSigned ? 'success' : 'primary'}
              onClick={() => updateNeedSigned(id)}
            >
              <DrawIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá">
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => removeFile(id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FileCard;
