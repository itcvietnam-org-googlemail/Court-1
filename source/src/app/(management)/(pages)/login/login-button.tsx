'use client'
 
import React, { useActionState, startTransition, useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { login } from './actions';
 
export default function LoginButton({children, pendingText}: {children?: string; pendingText?: string}) {
  const [state, action, pending] = useActionState(login, {message: ''});

  useEffect(() => {
    if (state.message) {
      setSnackbar({ ...snackbar, open: true });
    }
  }, [state]);

  const [snackbar, setSnackbar] = useState({
    open: false
  });

  const handleOpen = () => {
    setSnackbar({ ...snackbar, open: true });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
 
  return (
      <div>
        <button formAction={action}>
            {pending ? pendingText : children}
        </button>
        {state.message && <Alert severity="error">{state.message}</Alert>}
        <Snackbar
          open={snackbar.open}
          onClose={handleClose}
          autoHideDuration={5000}
          message={state.message}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          key="b-r"
        />
      </div>
  );
}