import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { FaFileExcel, FaFilePdf, FaFileWord } from 'react-icons/fa';

const fileAccpetType: Accept = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx'
  ],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
};

const useStyles = makeStyles((theme: any) => ({
  dropzone: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[100],
    '&:hover': {
      cursor: 'pointer',
      borderColor: theme.palette.grey[600],
      backgroundColor: theme.palette.grey[200]
    }
  },
  thumb: {
    display: 'inline-flex',
    position: 'relative',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
    '&:hover $thumbOverlay': {
      opacity: 1,
      transition: 'opacity .3s ease-in-out'
    },
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  },
  thumbOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    background: '#0000008c'
  },

  thumbDeleteButton: {
    color: '#ffffff'
  },

  thumbName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: 100,
    maxHeight: 30
  },

  thumbContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    justifyContent: 'flex-start'
  }
}));

type PreviewFile = File & {
  preview?: string;
};

type DragAndDropBoxProps = {
  onChangeFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const DragAndDropBox: React.FC<DragAndDropBoxProps> = (props) => {
  const { onChangeFiles } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const classes = useStyles();

  const onDrop = (acceptedFiles: File[]) => {
    const format = acceptedFiles.map((file: File) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    const files = [...format, ...previews];
    setPreviews(files);
  };

  const deletePreview = (name: string) => {
    setPreviews((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  const getFilePreview = (file: PreviewFile) => {
    if (file.type.startsWith('image/')) {
      return (
        <img src={file.preview} className={classes.thumb} alt={file.name} />
      );
    } else {
      switch (file.type.toLowerCase()) {
        case 'application/pdf':
          return <FaFilePdf className={classes.thumb} />;
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return <FaFileExcel className={classes.thumb} />;
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return <FaFileWord className={classes.thumb} />;
        default:
          return <Box>{file.name}</Box>;
      }
    }
  };

  const { getRootProps, isDragActive } = useDropzone({
    accept: fileAccpetType,
    onDrop,
    multiple: true
  });

  useEffect(() => {
    // set to parent component
    onChangeFiles(previews);
  }, [previews]);

  const preventClick = (e: any) => {
    e.stopPropagation();
  };

  const thumbs = previews.map((file) => (
    <Box key={file.name} onClick={preventClick}>
      <Box component="div" className={classes.thumb}>
        <Box component="div">
          {getFilePreview(file)}
          <Box className={classes.thumbOverlay} component="div">
            <IconButton
              className={classes.thumbDeleteButton}
              onClick={() => deletePreview(file.name)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box className={classes.thumbName}>{`${file.name} - ${(
        file.size /
        1024 /
        1024
      ).toFixed(2)} MB`}</Box>
    </Box>
  ));

  return (
    <Box component="div">
      <Box
        className={classes.dropzone}
        {...getRootProps()}
        borderColor={
          isDragActive
            ? 'primary.main'
            : isHovered
            ? 'primary.light'
            : 'inherit'
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {previews.length === 0 ? (
          <Box className={classes.thumbContainer}>
            {isDragActive ? (
              <p>Kéo file vào đây</p>
            ) : (
              <p>Kéo thả file vào đây hoặc click để tải file lên</p>
            )}
          </Box>
        ) : (
          <Box className={classes.thumbContainer}>{thumbs}</Box>
        )}
      </Box>
    </Box>
  );
};

export default DragAndDropBox;
