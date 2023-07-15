/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, FormHelperText, Theme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { Controller, FieldValues } from 'react-hook-form';
import { FaFileExcel, FaFilePdf, FaFileWord } from 'react-icons/fa';

const PREFIX = 'Dropzone';
const classes = {
  root: `${PREFIX}-root`,
  thumb: `${PREFIX}-thumb`,
  thumbOverlay: `${PREFIX}-thumbOverlay`,
  thumbDeleteButton: `${PREFIX}-thumbDeleteButton`,
  thumbName: `${PREFIX}-thumbName`,
  thumbContainer: `${PREFIX}-thumbContainer`
};
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
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
  [`& .${classes.thumb}`]: {
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
    '&:hover .thumbOverlay': {
      opacity: 1,
      transition: 'opacity .3s ease-in-out'
    },
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  },
  [`& .${classes.thumbOverlay}`]: {
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
  [`& .${classes.thumbDeleteButton}`]: {
    color: '#ffffff'
  },
  [`& .${classes.thumbName}`]: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: 100,
    maxHeight: 30
  },
  [`& .${classes.thumbContainer}`]: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    justifyContent: 'flex-start'
  }
}));

export type PreviewFile = File & {
  preview?: string;
};

export type DragAndDropBoxProps = {
  fileAccpetType?: Accept;
  error: boolean;
  helperText: string;
  value: File[];

  onChange: (event: any) => void;
};

type ThumbProps = {
  file: File;
  classes: any;

  preventClick: (e: any) => void;

  deletePreview: (name: string) => void;
};

const Thumb: React.FC<ThumbProps> = (props) => {
  const { file, deletePreview, preventClick } = props;
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
          return <Box component="div">{file.name}</Box>;
      }
    }
  };
  return (
    <Box key={file.name} component="div" onClick={preventClick}>
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
      <Box component="div" className={classes.thumbName}>{`${file.name} - ${(
        file.size /
        1024 /
        1024
      ).toFixed(2)} MB`}</Box>
    </Box>
  );
};

const DragAndDropBox: React.FC<DragAndDropBoxProps> = ({
  fileAccpetType,
  error,
  helperText,
  onChange,
  value
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const format = acceptedFiles.map((file: File) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    const files = [...format, ...value];
    onChange(files);
  };

  const deletePreview = (name: string) => {
    const filesLeft = value.filter((file) => file.name !== name);
    onChange(filesLeft);
  };

  const { getRootProps, isDragActive } = useDropzone({
    accept: fileAccpetType,
    onDrop,
    multiple: true
  });

  const preventClick = (e: any) => {
    e.stopPropagation();
  };

  const thumbs = value.map((file, idx) => (
    <Thumb
      key={idx}
      file={file}
      classes={classes}
      preventClick={preventClick}
      deletePreview={deletePreview}
    />
  ));

  return (
    <Box component="div">
      <Box
        component="div"
        className={classes.root}
        {...getRootProps()}
        borderColor={
          error
            ? 'error.main'
            : isDragActive
            ? 'primary.main'
            : isHovered
            ? 'primary.light'
            : 'inherit'
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {value.length === 0 ? (
          <Box component="div" className={classes.thumbContainer}>
            {isDragActive ? (
              <p>Kéo file vào đây</p>
            ) : (
              <p>Kéo thả file vào đây hoặc click để tải file lên</p>
            )}
          </Box>
        ) : (
          <Box component="div" className={classes.thumbContainer}>
            {thumbs}
          </Box>
        )}
        {error && <FormHelperText error>{helperText}</FormHelperText>}
      </Box>
    </Box>
  );
};

export type WrappedDragDropFileBoxProps = {
  name: string;
  form: FieldValues;
  defaultValue?: any;
  fileAccpetType?: Accept;
};

export const WrappedDragDropFileBox: React.FC<WrappedDragDropFileBoxProps> = (
  props
) => {
  const { name, form, fileAccpetType } = props;
  const { control } = form;

  const hanldeInputFiles = (
    files: PreviewFile[],

    onChange: (value: any) => void
  ) => {
    onChange(files);
  };

  return (
    <Root>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState }: any) => {
          return (
            <DragAndDropBox
              value={value}
              fileAccpetType={fileAccpetType}
              error={Boolean(fieldState?.error)}
              helperText={fieldState?.error?.message}
              onChange={(e) => hanldeInputFiles(e, onChange)}
            />
          );
        }}
      />
    </Root>
  );
};
