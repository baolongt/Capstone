/* eslint-disable @typescript-eslint/no-explicit-any */
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  FormHelperText,
  IconButton,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { indigo } from '@mui/material/colors';
import React, { useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { Controller, UseFormReturn } from 'react-hook-form';
import { FaFileExcel, FaFilePdf, FaFileWord } from 'react-icons/fa';

import { UploadFile } from '@/models';

const getFileIcon = (file: File) => {
  if (file.type.startsWith('image/')) {
    return <ImageIcon style={{ fontSize: '2rem' }} />;
  } else {
    switch (file.type.toLowerCase()) {
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

export interface DragDropFiledProps {
  fileAccpetType?: Accept;
  error: boolean;
  helperText: string;
  value: UploadFile | null;
  onChange: (event: any) => void;
}

export const DragDropFile: React.FC<DragDropFiledProps> = ({
  fileAccpetType,
  error,
  helperText,
  onChange,
  value
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const newFile = new UploadFile({
      fileObj: acceptedFiles[0]
    });
    onChange(newFile);
  };

  const removeFile = () => {
    onChange(null);
  };

  const { getRootProps, isDragActive } = useDropzone({
    accept: fileAccpetType,
    onDrop,
    multiple: true
  });

  return (
    <Box>
      {!value ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            minHeight: 150,
            backgroundColor: isDragActive
              ? indigo[50]
              : isHovered
              ? indigo[50]
              : '#fff',
            borderColor: error
              ? theme.palette.error.main
              : isDragActive
              ? theme.palette.primary.light
              : isHovered
              ? theme.palette.primary.light
              : 'grey.400',
            borderRadius: '4px',
            '&.Mui-error': {
              borderColor: theme.palette.error.main
            }
          }}
          {...getRootProps()}
          border={1}
          onMouseEnter={() => setIsHovered(true)}
        >
          <Box
            component="div"
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Box
              sx={{
                py: 10,
                color: error
                  ? theme.palette.error.main
                  : theme.palette.secondary.dark
              }}
            >
              {isDragActive ? (
                <Typography>Kéo file vào đây</Typography>
              ) : (
                <Typography>
                  Kéo thả file vào đây hoặc click để tải file lên
                </Typography>
              )}
            </Box>
          </Box>

          {error && <FormHelperText error>{helperText}</FormHelperText>}
        </Box>
      ) : value.fileObj ? (
        <Box
          sx={{
            px: 'auto',
            display: 'flex',
            justifyContent: 'center',
            minHeight: 150,
            backgroundColor: theme.palette.secondary.light,
            pt: 5
          }}
        >
          <Box sx={{ maxHeight: '100%', overflow: 'auto', mr: 1 }}>
            <Box style={{ marginTop: 12 }}>{getFileIcon(value.fileObj)}</Box>
          </Box>
          <Box
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
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
              {value.fileObj.name}
            </Typography>
            <Box>
              <Typography gutterBottom variant="caption">
                {value.fileObj.size > 100000
                  ? `${(value.fileObj.size / 1000000).toFixed(2)} MB`
                  : `${(value.fileObj.size / 1000).toFixed(2)} KB`}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ maxHeight: '100%', overflow: 'auto', pt: 2, pl: 3 }}>
            <Tooltip title="Xoá">
              <IconButton onClick={removeFile}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export type WrappedDragDropFileProps = {
  name: any;
  form: UseFormReturn<any, any, undefined>;
  defaultValue?: any;
  fileAccpetType?: Accept;
};

export const WrappedDragDropFile: React.FC<WrappedDragDropFileProps> = ({
  name,
  form,
  fileAccpetType
}) => {
  const { control } = form;
  const hanldeInputFiles = (
    file: UploadFile[],
    onChange: (value: any) => void
  ) => {
    onChange(file);
  };

  return (
    <Box>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState }: any) => {
          return (
            <DragDropFile
              value={value}
              fileAccpetType={fileAccpetType}
              error={Boolean(fieldState?.error)}
              helperText={fieldState?.error?.message}
              onChange={(e) => hanldeInputFiles(e, onChange)}
            />
          );
        }}
      />
    </Box>
  );
};
