/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, FormHelperText, Paper, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { Controller, UseFormReturn } from 'react-hook-form';

import { UploadFile } from '@/models';

import FileUploadedAccordion from './file-uploaded-accordion';

export type DragAndDropBoxProps = {
  fileAccpetType?: Accept;
  error: boolean;
  helperText: string;
  value: UploadFile[];
  onChange: (event: any) => void;
};

const DragAndDropBox: React.FC<DragAndDropBoxProps> = ({
  fileAccpetType,
  error,
  helperText,
  onChange,
  value
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file: File) => {
      const uploadFile: UploadFile = new UploadFile({
        fileObj: file
      });
      return uploadFile;
    });
    const files = [...newFiles, ...value];
    onChange(files);
  };

  const removeFile = (id: string) => {
    const filesLeft = value.filter((file) => file.id !== id);
    onChange(filesLeft);
  };

  const updateNeedSigned = (id: string) => {
    const files = value.map((file) => {
      if (file.id === id) {
        file.needSigned = !file.needSigned;
      }
      return file;
    });
    onChange(files);
  };

  const { getRootProps, isDragActive } = useDropzone({
    accept: fileAccpetType,
    onDrop,
    multiple: true
  });

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          minHeight: 150,
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
        onMouseLeave={() => setIsHovered(false)}
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
      {value.length > 0 && (
        <FileUploadedAccordion
          sx={{ marginTop: '10px' }}
          files={value}
          removeFile={removeFile}
          updateNeedSigned={updateNeedSigned}
        />
      )}
    </Box>
  );
};

export type WrappedDragDropFileBoxProps = {
  name: any;
  form: UseFormReturn<any, any, undefined>;
  defaultValue?: any;
  fileAccpetType?: Accept;
};

export const WrappedDragDropFileBox: React.FC<WrappedDragDropFileBoxProps> = (
  props
) => {
  const { name, form, fileAccpetType } = props;
  const { control } = form;

  const hanldeInputFiles = (
    files: UploadFile[],

    onChange: (value: any) => void
  ) => {
    onChange(files);
  };

  return (
    <Box>
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
    </Box>
  );
};
