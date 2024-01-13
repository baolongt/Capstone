import { Box } from '@mui/material';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useListDocumentTypes } from '@/apis/documentType/listDocumentTypes';
import { useUpdateDocType } from '@/apis/documentType/updateDocType';
import { CustomButton, InputSearch, Loading } from '@/components/common';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import { DocTypePayload, UpdateDocTypesDialog } from '@/components/dialogs';
import AddDocTypesDialog from '@/components/dialogs/add-doc-types-dialog';
import { DocumentTypeTable } from '@/components/document-type/document-types-table';
import theme from '@/components/theme/theme';
import { DEBOUND_SEARCH_TIME, DEFAULT_PAGE_WIDTH } from '@/constants';
import { BaseTableQueryParams } from '@/types';

const DocumentTypeManagement = () => {
  const [queryParams, setQueryParams] = useState<BaseTableQueryParams>({
    page: 1,
    size: 10
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDocType, setSelectedDocType] = useState<
    DocTypePayload | undefined
  >(undefined);

  const { data: response, isLoading } = useListDocumentTypes({
    queryParams
  });

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const [selectingDocType, setSelectingDocType] = useState<number>();

  const openUpdateDialog = (id: number) => {
    setIsUpdate(true);
    setSelectingDocType(id);
    setSelectedDocType(response?.data.find((type) => type.id === id));
  };

  const { mutate: updateDocType, isLoading: isUpdating } = useUpdateDocType({
    onSuccess: () => {
      toast.success('Cập nhật thành công');
      setIsUpdate(false);
    },
    onError: (error) => {
      toast.error(error ?? 'Cập nhật thất bại');
    }
  });

  const handleUpdate = (payload: { description: string; field: number }) => {
    updateDocType({
      id: selectingDocType ?? -1,
      payload
    });
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setQueryParams({ ...queryParams, search: e.target.value });
  };
  const debouncedSearch = debounce(handleChangeSearch, DEBOUND_SEARCH_TIME);

  if (isLoading) {
    return <Loading />;
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
            <Box>
              <InputSearch
                sx={{ width: '300px', bgcolor: '#fff' }}
                placeholder="Tìm kiếm..."
                onTextChange={debouncedSearch}
              />
            </Box>
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
            openUpdateDialog={openUpdateDialog}
          />
        </Box>

        <AddDocTypesDialog isOpen={isOpen} onClose={handleClose} />
        <UpdateDocTypesDialog
          data={selectedDocType!}
          handleUpdate={handleUpdate}
          isOpen={isUpdate}
          isLoading={isUpdating}
          onClose={() => {
            setIsUpdate(false);
          }}
        />
      </Box>
    );
  }
};

export default DocumentTypeManagement;
