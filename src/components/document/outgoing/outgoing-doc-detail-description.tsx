import { Box, Grid, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC } from 'react';

import { outgoingDocument } from '@/models';

export type DetailDescriptionProps = {
  sx?: SxProps;
  data: outgoingDocument.OutgoingDocument;
};

export const DetailDescription: FC<DetailDescriptionProps> = (props) => {
  const { sx, data: document } = props;
  const {
    epitomize,
    documentNotation,
    documentField,
    documentTypeName,
    createdByName,
    publishDate
  } = document;
  const detailStyle = { py: 1, px: 1 };
  const labelFontWeight = 600;

  return (
    <Box sx={{ flexGrow: 1, ...sx }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={detailStyle}>
          <Typography variant="subtitle1" sx={{ fontWeight: labelFontWeight }}>
            Trích yếu: {'  '}
            <Typography component="span">{epitomize}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={detailStyle}>
          <Typography variant="subtitle1" sx={{ fontWeight: labelFontWeight }}>
            Ký hiệu văn bản: {'  '}
            <Typography component="span">{documentNotation}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={detailStyle}>
          <Typography variant="subtitle1" sx={{ fontWeight: labelFontWeight }}>
            Lĩnh vực văn bản: {'  '}
            <Typography component="span">{documentField}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={detailStyle}>
          <Typography variant="subtitle1" sx={{ fontWeight: labelFontWeight }}>
            Loại văn bản: {'  '}
            <Typography component="span">{documentTypeName}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={detailStyle}>
          <Typography variant="subtitle1" sx={{ fontWeight: labelFontWeight }}>
            Người soạn thảo: {'  '}
            <Typography component="span">{createdByName}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={detailStyle}>
          <Typography variant="subtitle1" sx={{ fontWeight: labelFontWeight }}>
            Ngày tạo: {'  '}
            <Typography component="span">
              {dayjs(publishDate).format('DD/MM/YYYY')}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
