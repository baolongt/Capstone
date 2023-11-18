import { Box, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import { EditPublishInfo } from '@/components/document/outgoing/outgoing-doc-edit-publish-info';

const OutgoingEditPublishInfoPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Box>
        <PageHeader>
          <Box>
            <PageTitle label="Chỉnh sửa thông tin phát hành" />
          </Box>
        </PageHeader>
        <Box
          sx={{
            mx: 'auto',
            width: '1080px',
            mt: 3,
            pt: 3,
            px: 2,
            minHeight: '80vh'
          }}
          component={Paper}
        >
          <EditPublishInfo docId={Number(id)} />
        </Box>
      </Box>
    </>
  );
};

export default OutgoingEditPublishInfoPage;
