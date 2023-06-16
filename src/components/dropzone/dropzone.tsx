import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';

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
      borderColor: theme.palette.grey[600],
      backgroundColor: theme.palette.grey[200]
    }
  },
  chip: {
    minWidth: 160,
    maxWidth: 210
  }
}));

const Dropzone = () => {
  const [isHovered, setIsHovered] = useState(false);
  // const [uploadedFiles, setUploadedFiles] = useState([]);
  const classes = useStyles();

  // const onDrop = useCallback((acceptedFiles) => {
  //   console.log(acceptedFiles);
  //   setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  // }, []);
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   multiple: true
  // });

  return (
    <Box
      borderColor={isHovered ? 'primary.light' : 'inherit'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DropzoneArea
        showPreviews={false}
        showPreviewsInDropzone={true}
        useChipsForPreview
        previewGridProps={{
          container: {
            spacing: 1,
            direction: 'row'
          }
        }}
        previewChipProps={{ classes: { root: classes.chip } }}
        previewText="File đã chọn"
        filesLimit={10}
      />
    </Box>
  );
};

export default Dropzone;
