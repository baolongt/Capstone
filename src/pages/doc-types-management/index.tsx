import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useListDocumentTypes } from '@/apis/documentType/listDocumentTypes';
import { CustomButton } from '@/components/common';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import AddDocTypesDialog from '@/components/dialogs/add-doc-types-dialog';
import { DocumentTypeTable } from '@/components/document-type/document-types-table';
import theme from '@/components/theme/theme';
import { DEFAULT_PAGE_WIDTH } from '@/constants';
import { BaseTableQueryParams } from '@/types';

const DocumentTypeManagement = () => {
  const [queryParams, setQueryParams] = useState<BaseTableQueryParams>({
    page: 1,
    size: 10
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: response, isLoading } = useListDocumentTypes({
    queryParams
  });

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  const handleUpdateDepartment = (departmentId: number) => {
    console.log('update', departmentId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (response) {
    const { data, metadata } = response;

    return (
      <Box>
        <PageHeader>
          <PageTitle label="Loại văn bản" />
          <Box
            component="div"
            sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}
          >
            <CustomButton
              size="small"
              label="Thêm loại văn bản"
              onClick={handleOpen}
            />
          </Box>
        </PageHeader>
        <Box
          sx={{
            mx: 'auto',
            width: DEFAULT_PAGE_WIDTH,
            [theme.breakpoints.down('xl')]: {
              width: '90%'
            }
          }}
        >
          <DocumentTypeTable
            data={data}
            metadata={metadata}
            handleChangePage={handleChangePage}
            handleUpdateDepartment={handleUpdateDepartment}
            //handleOpenDeleteDialog={handleOpenDeleteDialog}
          />
        </Box>

        <AddDocTypesDialog isOpen={isOpen} onClose={handleClose} />
      </Box>
    );
  }
};

export default DocumentTypeManagement;
