'use client'
 
import React, { useActionState, startTransition, useState, useEffect, useRef } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { login, sigin } from './actions';
 
export default function LoginButton({
  expanded,
  children,
  pendingText,
  fn,
  useFormAction = true,
  onActionState
}: {
  expanded?: boolean;
  children?: string;
  pendingText?: string;
  fn?: any;
  useFormAction?: boolean;
  onActionState?: any;
}) {
    const wrappedFn = async (prevState: any, formData: FormData) => {
        const result = await fn(prevState, formData);

        if (onActionState) onActionState(result);

        return result;
    };

    const [loading, setLoading] = useState(false);
    const [mess, setMess] = useState(null);

    const [state, action, pending] = useActionState(fn, {message: '', data: {}});

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
        setMess(null);
    };

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setLoading(true);

        const form = event.currentTarget.form ?? undefined;

        startTransition(async () => {
            const result = await fn(new FormData(form));
            
            if (result.message) {
                setMess(result.message);
            } else {
                form?.reset();
            }

            setLoading(false);
        });
    };
    
    return (
        <div>
            {useFormAction ? (
                <Button type="submit" formAction={action}>
                    {pending ? pendingText : children}
                </Button>
            ) : (
                <Button type="submit" onClick={handleSubmit} disabled={loading}>
                    {loading ? pendingText : children}
                </Button>
            )}
            
            {state.message && <Alert severity="error">{state.message}</Alert>}

            <Snackbar
                open={snackbar.open}
                onClose={handleClose}
                autoHideDuration={5000}
                message={state.message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                key="b-r"
            />

            <Snackbar
                open={Boolean(mess)}
                onClose={handleClose}
                autoHideDuration={5000}
                message={mess}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                key="b-c"
            />
        </div>
    );
}