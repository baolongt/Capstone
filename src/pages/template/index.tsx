import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import { debounce } from 'lodash';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useCreateTempalteDoc, useListTemplate } from '@/apis';
import { InputSearch, Loading } from '@/components/common';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import CreateTemplateDialog, {
  TemplateCreate
} from '@/components/dialogs/create-template-dialog';
import { TemplateDocTable } from '@/components/template-document';
import { DEBOUND_SEARCH_TIME, DEFAULT_PAGE_WIDTH } from '@/constants';
import { BaseTableQueryParams } from '@/types';

const TemplatePage = () => {
  const [queryParams, setQueryParams] = React.useState<BaseTableQueryParams>({
    page: 1,
    size: 10,
    search: ''
  });
  const [openCreate, setOpenCreate] = React.useState(false);

  const { mutate: createTemplate } = useCreateTempalteDoc({
    onSuccess: () => {
      toast.success('Tạo văn bản mẫu thành công');
    },
    onError: () => {
      toast.error('Tạo văn bản mẫu thất bại');
    }
  });

  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setQueryParams({ ...queryParams, search: e.target.value });
  };

  const debouncedSearch = debounce(handleChangeSearch, DEBOUND_SEARCH_TIME);

  const handleSubmit = (payload: TemplateCreate) => {
    console.log('submit', payload);
    createTemplate(payload);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const { data: response, isLoading } = useListTemplate({
    queryParams
  });
  useEffect(() => {
    console.log('queryParams', queryParams);
  }, [queryParams]);

  if (isLoading) {
    return <Loading />;
  }

  if (response) {
    const { data, metadata } = response;
    return (
      <>
        <Box>
          <PageHeader>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <PageTitle label="Văn bản mẫu" />
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreate}
                >
                  Tạo văn bản mẫu mới
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 1
              }}
            >
              <Box>
                <InputSearch
                  sx={{ width: '300px', bgcolor: '#fff' }}
                  placeholder="Tìm kiếm..."
                  onTextChange={debouncedSearch}
                />
              </Box>
            </Box>
          </PageHeader>

          <Box
            sx={{
              mx: 'auto',
              width: DEFAULT_PAGE_WIDTH
            }}
          >
            <TemplateDocTable
              metadata={metadata}
              data={data}
              handleChangePage={handleChangePage}
              sx={{ minHeight: '30vh' }}
            />
          </Box>
        </Box>
        <CreateTemplateDialog
          isOpen={openCreate}
          onSubmit={handleSubmit}
          onClose={handleCloseCreate}
        />
      </>
    );
  }
};

export default TemplatePage;