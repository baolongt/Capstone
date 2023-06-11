import { TableCell, TableHead, TableRow } from "@mui/material";
import { Column, columns } from "../../models/user";
import React from "react";

const CustomTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column: Column, index: number) => (
          <TableCell
            sx={{ minWidth: column.minWidth, pl: "16px !important", height: '50px' }}
            key={index}
            align={"left"}
            padding="checkbox"
          >
            {column.heading}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;