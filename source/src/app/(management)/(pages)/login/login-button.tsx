'use client'
 
import React, { useActionState, startTransition, useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
 
export default function LoginButton({expanded, children, pendingText, fn}: 
  {expanded?: boolean, children?: string; pendingText?: string, fn: any}) {
  const [state, action, pending] = useActionState(fn, {message: ''});

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

  const sxjson = '{"fontWeight": "bold", "color": "red", ":has(.Mui-expanded)": {"color": "green"}, "& span": {"color": "yellow"}, ":hover": {"color": "blue"}}';
  const sx = JSON.parse(sxjson);
  const b = 'false';
  const r = JSON.parse(b);
  
  return (
      <div>
        <Button formAction={action} type="submit" sx={sx} className="Mui-expanded">
            {pending ? pendingText : children}
        </Button>
        
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