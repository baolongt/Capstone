import AddIcon from '@mui/icons-material/Add';
import { Box, Typography, useTheme } from '@mui/material';
import { debounce } from 'lodash';
import React, { useState } from 'react';

import { useListFiles } from '@/apis';
import { CustomButton, InputSearch } from '@/components/common';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import CreateUpdateFileDialog from '@/components/dialogs/create-update-file-dialog';
import { FileTable } from '@/components/file';
import { DEBOUND_SEARCH_TIME, DEFAULT_PAGE_WIDTH } from '@/constants';
import { BaseTableQueryParams } from '@/types';

const FileManagement = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<BaseTableQueryParams>({
    page: 1,
    size: 10,
    search: ''
  });

  const { data: response, isLoading } = useListFiles({
    queryParams
  });

  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setQueryParams({ ...queryParams, search: e.target.value });
  };
  const debouncedSearch = debounce(handleChangeSearch, DEBOUND_SEARCH_TIME);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (response) {
    const { data, metadata } = response;

    return (
      <Box>
        <PageHeader>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <PageTitle label="hồ sơ" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <InputSearch
              placeholder="Tìm kiếm..."
              onTextChange={debouncedSearch}
            />
            <CustomButton
              label="Thêm sổ mới"
              startIcon={<AddIcon />}
              onClick={() => setIsOpen(true)}
            />
          </Box>
        </PageHeader>
        <Box
          sx={{
            mx: 'auto',
            width: DEFAULT_PAGE_WIDTH
          }}
        >
          <FileTable
            metadata={metadata}
            data={data}
            handleChangePage={handleChangePage}
          />
        </Box>

        <CreateUpdateFileDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </Box>
    );
  }
};

export default FileManagement;
