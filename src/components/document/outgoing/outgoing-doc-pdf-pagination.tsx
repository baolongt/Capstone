import { Box, Button, Typography } from '@mui/material';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PdfPagination = ({
  totalPages,
  currentPage,
  onPageChange
}: PaginationProps) => {
  const handlePrevClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        mb: 2
      }}
    >
      <Button
        variant="contained"
        disabled={currentPage === 0}
        onClick={handlePrevClick}
      >
        Trang trước
      </Button>
      <Typography sx={{ marginX: 2 }}>{`Trang ${
        currentPage + 1
      } / ${totalPages}`}</Typography>
      <Button
        variant="contained"
        disabled={currentPage === totalPages - 1}
        onClick={handleNextClick}
      >
        Trang sau
      </Button>
    </Box>
  );
};

export default PdfPagination;
