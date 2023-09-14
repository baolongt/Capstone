import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';
import { debounce } from 'lodash';
import React, { useState } from 'react';

import { useListFiles } from '@/apis';
import { useListContacts } from '@/apis/contact';
import { CustomButton, InputSearch } from '@/components/common';
import { ContactTable } from '@/components/contact/contact-table';
import { CreateContactDialog } from '@/components/dialogs';
import CreateUpdateFileDialog from '@/components/dialogs/create-update-file-dialog';
import { FileTable } from '@/components/file';
import { DEBOUND_SEARCH_TIME, DEFAULT_PAGE_WIDTH } from '@/constants';
import { BaseTableQueryParams } from '@/types';

const ContactList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<BaseTableQueryParams>({
    page: 1,
    size: 10,
    search: ''
  });

  const { data: response, isLoading } = useListContacts({
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
        <Box bgcolor="#fff" sx={{ mb: 3 }}>
          <Box sx={{ py: 2, mx: 'auto', width: DEFAULT_PAGE_WIDTH }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2
              }}
            >
              <Typography variant="h4">Danh sách liên lạc</Typography>
            </Box>
            <Box
              component="div"
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
              <InputSearch
                placeholder="Tìm kiếm..."
                onTextChange={debouncedSearch}
              />
              <CustomButton
                label="Thêm đơn vị"
                startIcon={<AddIcon />}
                onClick={() => setIsOpen(true)}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mx: 'auto',
            width: DEFAULT_PAGE_WIDTH
          }}
        >
          <ContactTable
            metadata={metadata}
            data={data}
            handleChangePage={handleChangePage}
          />
        </Box>

        <CreateContactDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </Box>
    );
  }
};

export default ContactList;
