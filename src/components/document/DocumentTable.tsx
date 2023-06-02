import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { fakerVI as faker } from '@faker-js/faker';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TablePagination } from '@mui/material';

type IDocument = {
  title: string;
  code: string;
  department: string;
  createdDate: string;
  signer: string;
  status: string;
};

const documents: IDocument[] = [];

for (let i = 0; i < 20; i++) {
  const newDocument: IDocument = {
    title: faker.lorem.words({ min: 15, max: 60 }),
    code: faker.number.int({ min: 1_000_000, max: 9_999_999 }) + '',
    department: faker.company.name(),
    createdDate: new Date(faker.date.past().toISOString()).toLocaleDateString(
      'en-GB',
      {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }
    ),
    signer: faker.person.fullName(),
    status: 'Pending'
  };
  documents.push(newDocument);
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const DocumentTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '30%' }}>Trích yếu</TableCell>
              <TableCell>Số ký hiệu</TableCell>
              <TableCell>Cơ quan ban hành</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Người ký</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell style={{ width: '25%' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((document, i) => (
                <StyledTableRow key={i}>
                  <TableCell component="th" scope="row">
                    <Link href="#">{document.title}</Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {document.code}
                  </TableCell>
                  <TableCell>{document.department}</TableCell>
                  <TableCell>{document.createdDate}</TableCell>
                  <TableCell>{document.signer}</TableCell>
                  <TableCell>{document.status}</TableCell>
                  <TableCell>
                    <Box sx={{ '& button': { m: 0.2 } }}>
                      <div>
                        <Button size="small">Xem</Button>
                        <Button size="small">Xử lý</Button>
                        <Button size="small">Hoàn tất</Button>
                      </div>
                    </Box>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={documents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DocumentTable;
