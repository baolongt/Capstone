import { Box, Grid, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetFileById } from '@/apis';
import { OutgoingDocumentTable } from '@/components/document';
import { BaseTableQueryParams } from '@/types';

const labelFontWeight = 600;
const GridItem = (props: { label: string; value: string }) => {
  return (
    <Grid item xs={6}>
      <Typography variant="subtitle1" sx={{ fontWeight: labelFontWeight }}>
        {props.label}: {'  '}
        <Typography component="span">{props.value}</Typography>
      </Typography>
    </Grid>
  );
};

const FileDetail = () => {
  const params = useParams();
  const theme = useTheme();
  const { data: response, isLoading } = useGetFileById(Number(params.id));
  const [queryParams, setQueryParams] = useState<BaseTableQueryParams>({
    page: 1,
    size: 10,
    search: ''
  });
  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };
  if (isLoading) return <>Loading...</>;
  if (response) {
    const { data, metadata } = response as any;
    return (
      <Box
        sx={{ px: 8, py: 3, display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.primary.main
          }}
        >
          Sổ văn bản
        </Typography>
        <Grid container spacing={2}>
          <GridItem label="Tiêu đề sổ" value={data?.title} />
          <GridItem label="Số và kí hiệu" value={data?.fileNotation} />
          <GridItem label="Năm tạo sổ" value={data?.fileCreatedYear} />
          <GridItem label="Người tạo" value={data?.creator} />
          <GridItem
            label="Ngày áp dụng"
            value={moment(data?.startDate).format('DD/MM/YYYY')}
          />
          <GridItem
            label="Ngày đóng sổ"
            value={moment(data?.endDate).format('DD/MM/YYYY')}
          />
          <GridItem label="Tổng số văn bản" value={data?.docTotal} />
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: labelFontWeight }}
            >
              Mô tả: {'  '}
            </Typography>
            <Typography component="span">{data?.description}</Typography>
          </Grid>
        </Grid>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.primary.main
          }}
        >
          Văn bản
        </Typography>
        <OutgoingDocumentTable
          data={data?.outgoingDocuments}
          handleChangePage={handleChangePage}
        />
      </Box>
    );
  }
};

export default FileDetail;
