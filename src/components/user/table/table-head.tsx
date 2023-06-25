import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Column } from "../../../types";

interface UserTableHeadProps {
  columns: Column[];
}

const UserTableHead : React.FC<UserTableHeadProps> = ({columns}) => {
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

export default UserTableHead;