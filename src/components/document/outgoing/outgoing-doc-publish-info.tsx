import { Box, Chip, Grid, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC } from 'react';

import { OutgoingPublishInfo } from '@/models/outgoingDocument';

export type PublishInfoProps = {
  sx?: SxProps;
  data: OutgoingPublishInfo;
};

export const PublishInfo: FC<PublishInfoProps> = (props) => {
  const { sx, data } = props;
  const { outgoingNumber, outgoingNotation, dueDate, contactLists } = data;
  const detailStyle = { py: 1, px: 1 };
  const labelFontWeight = 600;

  return (
    <Box sx={{ flexGrow: 1, ...sx }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={detailStyle}>
          <Typography variant="subtitle1" sx={{ fontWeight: labelFontWeight }}>
            Ký hiệu văn bản: {'  '}
            <Typography component="span">{outgoingNotation}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={detailStyle}>
          <Typography variant="subtitle1" sx={{ fontWeight: labelFontWeight }}>
            Số hiệu: {'  '}
            <Typography component="span">{outgoingNumber}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={detailStyle}>
          <Typography variant="subtitle1" sx={{ fontWeight: labelFontWeight }}>
            Hạn xử lý: {'  '}
            <Typography component="span">
              {dayjs(dueDate).format('DD/MM/YYYY')}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={detailStyle}>
          <Typography variant="subtitle1" sx={{ fontWeight: labelFontWeight }}>
            Danh sách liên hệ:
          </Typography>
          {contactLists.map((cl) => (
            <Chip
              key={cl.id}
              label={cl.name}
              variant="outlined"
              sx={{ mr: 1 }}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
