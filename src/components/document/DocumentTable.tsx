import React from 'react';
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
  return (
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
            <TableCell style={{ width: '20%' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((document, i) => (
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
  );
};

export default DocumentTable;
