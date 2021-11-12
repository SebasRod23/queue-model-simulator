import React from 'react';
import { Alert, Snackbar } from '@mui/material';

interface WarningSnackbarProps {
  warning: string | undefined;
  open: boolean | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WarningSnackbar: React.FC<WarningSnackbarProps> = (
  props: WarningSnackbarProps,
) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={props.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity='error'>{props.warning}</Alert>
    </Snackbar>
  );
};

export default WarningSnackbar;
