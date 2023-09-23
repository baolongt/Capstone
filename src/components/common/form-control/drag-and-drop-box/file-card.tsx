import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import DrawIcon from '@mui/icons-material/Draw';
import ImageIcon from '@mui/icons-material/Image';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { FaFileExcel, FaFilePdf, FaFileWord } from 'react-icons/fa';

import { UploadFile } from '@/models';

export type FileCardProps = {
  file: UploadFile;
  removeFile: (id: string) => void;
  updateNeedSigned: (id: string) => void;
  isUploaded?: boolean;
};

const FileCard: React.FC<FileCardProps> = (props) => {
  const {
    // get real File
    file: { fileObj, id, name, needSigned },
    removeFile,
    updateNeedSigned
  } = props;

  if (!fileObj) return null;

  const fileIcon = () => {
    if (fileObj.type.startsWith('image/')) {
      return <ImageIcon style={{ fontSize: '2rem' }} />;
    } else {
      switch (fileObj.type.toLowerCase()) {
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
          <Box style={{ marginTop: 12 }}>{fileIcon()}</Box>
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
            {fileObj.name ?? name}
          </Typography>
          <Typography gutterBottom variant="caption">
            {fileObj.size > 100000
              ? `${(fileObj.size / 1000000).toFixed(2)} MB`
              : `${(fileObj.size / 1000).toFixed(2)} KB`}
          </Typography>
        </Stack>
        {fileObj.type.toLowerCase() === 'application/pdf' && (
          <Tooltip title="Đánh dấu cần ký số">
            <IconButton
              aria-label="delete"
              color={needSigned ? 'success' : 'secondary'}
              onClick={() => updateNeedSigned(id)}
            >
              <DrawIcon />
            </IconButton>
          </Tooltip>
        )}
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
    </Box>
  );
};

export default FileCard;
