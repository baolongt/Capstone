import { Typography } from '@mui/material';
import { Box } from '@mui/system';

interface FieldTitleProps {
  title: string;
  isRequired?: boolean;
}

const FieldTitle = (props: FieldTitleProps) => {
  const { title, isRequired = false } = props;
  return (
    <Typography fontWeight={600}>
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
