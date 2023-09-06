import { Box, SxProps, Typography } from '@mui/material';

interface FieldTitleProps {
  title: string;
  isRequired?: boolean;
  sx?: SxProps;
}

const FieldTitle = (props: FieldTitleProps) => {
  const { title, isRequired = false, sx } = props;
  return (
    <Typography fontWeight={600} sx={sx}>
      {title}
      {isRequired && (
        <Box component="span" color="error.main">
          {` *`}
        </Box>
      )}
    </Typography>
  );
};

export { FieldTitle };
