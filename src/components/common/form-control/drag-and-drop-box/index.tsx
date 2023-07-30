/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, FormHelperText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { Controller, UseFormReturn } from 'react-hook-form';

import { UploadFile } from '@/models';
import { validation } from '@/types';

import FileUploadedAccordion from './file-uploaded-accordion';

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
    border: `1px solid #030303`,
    backgroundColor: theme.palette.grey[100],
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.grey[200]
    }
  }
}));

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
        <Box component="div" className={classes.thumbContainer}>
          {isDragActive ? (
            <Typography>Kéo file vào đây</Typography>
          ) : (
            <Typography>
              Kéo thả file vào đây hoặc click để tải file lên
            </Typography>
          )}
        </Box>
        {error && <FormHelperText error>{helperText}</FormHelperText>}
      </Box>
      <FileUploadedAccordion
        sx={{ marginTop: '10px' }}
        files={value}
        removeFile={removeFile}
        updateNeedSigned={updateNeedSigned}
      />
    </Box>
  );
};

export type WrappedDragDropFileBoxProps = {
  name: keyof validation.outgoingDocument.CreateType;
  form: UseFormReturn<validation.outgoingDocument.CreateType, any, undefined>;
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
