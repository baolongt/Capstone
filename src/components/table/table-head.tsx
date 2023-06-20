import { TableCell, TableHead, TableRow } from "@mui/material";
import { Column } from "../../models/user";
import React from "react";

interface CustomTableHeadProps {
  columns: Column[];

}

const CustomTableHead = (props: CustomTableHeadProps) => {
  const {columns} = props;
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