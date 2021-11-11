/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { IconButton, Snackbar, SnackbarContent } from '@mui/material';

const redWarning = css({
  backgroundColor: 'white',
  color: 'red',
  border: '1px solid red',
  textAlign: 'center',
});

interface AuthSnackbarProps {
  warning: string | undefined;
  open: boolean | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WarningSnackbar: React.FC<AuthSnackbarProps> = (
  props: AuthSnackbarProps,
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
      <SnackbarContent
        message={props.warning}
        css={redWarning}
        action={
          <>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleClose}
            >
              X
            </IconButton>
          </>
        }
      />
    </Snackbar>
  );
};

export default WarningSnackbar;
