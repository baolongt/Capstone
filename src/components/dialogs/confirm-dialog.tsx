import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import CustomButton from "../common/button";
import { ReactElement } from "react";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import React from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  message: ReactElement;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { isOpen, onClose, onConfirm, message } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          minWidth: { lg: "500px", md: "500px", xs: "75vw" },
        },
      }}
    >
      <DialogContent>
        <Stack direction={"row"} alignItems={'center'} gap = {3}>
          <HelpOutlinedIcon sx={{height: '64px', width: '64px', color: '#FFBC33'}} />
          <Box fontSize={'20px'}>
            {message}
            <Typography fontSize={'14px'} mt = {1} color = "#333">Bạn không thể hoàn tác sau bước này</Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: "0 24px 24px 0" }}>
        <CustomButton label="Hủy bỏ" onClick={onClose} variant="outlined" />
        <CustomButton label="Đồng ý" onClick={onConfirm} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;