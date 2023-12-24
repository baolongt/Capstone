/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, FormHelperText, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { Controller, UseFormReturn } from 'react-hook-form';

import { Attachment, UploadFile } from '@/models';

import FileUploadedAccordion from './file-uploaded-accordion';

export type DragAndDropBoxValueType = UploadFile | Attachment;

export type DragAndDropBoxProps = {
  fileAccpetType?: Accept;
  error: boolean;
  helperText: string;
  value: DragAndDropBoxValueType[];
  onChange: (event: any) => void;
  watchAttachment?: (id: string) => void;
  signAttachment?: (id: string) => void;
};

const DragAndDropBox: React.FC<DragAndDropBoxProps> = ({
  fileAccpetType,
  error,
  helperText,
  onChange,
  value,
  watchAttachment,
  signAttachment
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
    const filesLeft = value.filter((file) => {
      if (file.fileGuid) {
        return file.fileGuid != id;
      } else {
        return file.id != id;
      }
    });
    onChange(filesLeft);
  };

  const updateNeedSigned = (id: string) => {
    const files = value.map((file) => {
      console.log('file', file);
      if (file.fileGuid === id && file instanceof Attachment) {
        file.needSigned = !file.needSigned;
      } else if (file.id === id && file instanceof UploadFile) {
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
      {value && value.length > 0 && (
        <FileUploadedAccordion
          sx={{ marginTop: '10px' }}
          files={value}
          removeFile={removeFile}
          updateNeedSigned={updateNeedSigned}
          watchAttachment={watchAttachment}
          signAttachment={signAttachment}
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
  watchAttachment?: (id: string) => void;
  signAttachment?: (id: string) => void;
};

export const WrappedDragDropFileBox: React.FC<WrappedDragDropFileBoxProps> = (
  props
) => {
  const { name, form, fileAccpetType, watchAttachment, signAttachment } = props;
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
              watchAttachment={watchAttachment}
              signAttachment={signAttachment}
              onChange={(e) => hanldeInputFiles(e, onChange)}
            />
          );
        }}
      />
    </Box>
  );
};
