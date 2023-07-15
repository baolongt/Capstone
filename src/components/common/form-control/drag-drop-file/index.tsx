import { Box, IconButton, useTheme, SxProps, Typography } from '@mui/material';
import { ReactNode, useRef, useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import React  from 'react';

export interface DragDropFiledProps {
  name: string;
  icon?: ReactNode;
  form: FieldValues;
  disabled?: boolean;
  placeholder?: string;
  sizeFile?: string;
  oldUrl?: string;
  sx?: SxProps;
  preview?: boolean;
  accept: string;
  onFileChange?: (file: any) => void;
}

 const DragDropFile = (props: DragDropFiledProps) => {
  const {
    name,
    icon,
    accept,
    form,
    disabled,
    placeholder,
    sizeFile,
    oldUrl,
    onFileChange,
    preview = true,
    ...resProps
  } = props;
  const { control } = form;
  const wrapperRef = useRef(null);
  const [file, setFile] = useState<any>(null);
  const [imgPath, setImgPath] = useState<any>(null);
  const [isDragover, setIsDragOver] = useState(false);
  const onDragEnter = () => setIsDragOver(true);
  const onDragLeave = () => setIsDragOver(false);
  const onDrop = () => setIsDragOver(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const theme = useTheme();

  const handleImageLoad = () => {
    setLoading(false);
  };
  const handleImageError = () => {
    setLoading(false);
    setLoadError(true);
  };

  const handleFileDrop = (event: any) => {
    const newFile = event.target.files && event.target.files[0];
    if (newFile) {
      setFile(newFile);
      setImgPath(URL.createObjectURL(newFile));
      onFileChange && onFileChange(newFile);
      // if (accept.replaceAll('.', '').split(',').includes(newFile.type.split('/')[1])) {
      // }
    }
  };
  const onRemoveFile = (field: any) => {
    setFile(null);
    setImgPath(null);
    field.onChange(null);
  };

  return (
    <Box>
      <Box
        ref={wrapperRef}
        sx={{
          border: '2px dashed',
          borderRadius: '5px',
          alignItems: 'center',
          height: '145px',
          padding: '10px',
          opacity: isDragover ? 0.6 : 1,
          position: 'relative',
          fontSize: '14px',
          fontWeight: 600,
          '&:hover': {
            opacity: 0.8
          },
          backgroundColor: theme.palette.grey[300]
        }}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <Controller
          control={control}
          name={name}
          render={({ field}) => (
            <>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}
              >
                {(file || oldUrl) && preview ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        width: '100px',
                        height: '100px',
                        position: 'relative',
                        borderRadius: '5px'
                      }}
                    >
                      {loading && !loadError && (
                        <>Loading...</>
                        // <CircularLoader size='20px' color={theme.palette.grey[400]} />
                      )}
                      <Box
                        component='img'
                        src={file ? imgPath : oldUrl}
                        sx={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'contain',
                          border: '1px solid #EDF0F2',
                          borderRadius: '5px',
                          opacity: loading ? 0 : 1
                        }}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                      <IconButton
                        size='small'
                        sx={{
                          display: imgPath ? 'flex' : 'none',
                          position: 'absolute',
                          top: '-10px',
                          right: '-10px',
                          backgroundColor: theme.palette.grey[500],
                          color: theme.palette.common.white,
                          cursor: 'pointer',
                          fontSize: '15px',
                          zIndex: 1,
                          '&:hover': {
                            backgroundColor: theme.palette.grey[500],
                            color: theme.palette.common.white,
                            opacity: 0.6
                          }
                        }}
                        onClick={() => onRemoveFile(field)}
                        disabled={!imgPath}
                      >
                        <IoMdClose />
                      </IconButton>
                    </Box>
                    <Box sx={{ ml: '24px' }}>
                      {file?.name}
                      {/* <TextLimitShowTooltip
                        text={file?.name}
                        maxLength={20}
                        sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}
                      /> */}
                      <Typography sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
                        {/* {file && `${formatFileSize(file?.size)}`}{' '} */}
                        Format file size
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '600',
                        textAlign: 'center'
                      }}
                      >
                      {icon}
                      <br/>
                      {placeholder}
                    </Typography>
                    <Typography
                      sx={{
                        display: sizeFile ? 'flex' : 'none',
                        color: theme.palette.grey[300],
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    >
                      {accept.toUpperCase().replace(/\./g, ' ') + sizeFile}
                    </Typography>
                  </>
                )}
              </Box>
              <Box
                component='input'
                disabled={disabled}
                type='file'
                title=''
                sx={{
                  opacity: 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                  cursor: 'pointer'
                }}
                {...field}
                {...resProps}
                value=''
                accept={accept}
                onChange={(event: any) => {
                  handleFileDrop(event);
                  field.onChange(event.target.files?.[0]);
                }}
              />
            </>
          )}
        />
      </Box>
    </Box>
  );
};

export default DragDropFile;
