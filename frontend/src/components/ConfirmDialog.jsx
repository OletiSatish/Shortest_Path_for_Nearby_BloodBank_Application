import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

const ConfirmDialog = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
