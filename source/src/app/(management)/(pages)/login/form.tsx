'use client';

/*
* Import
*/
import React, { useActionState, startTransition, useState, useEffect, useRef } from 'react';
import { login, logout, placeholder } from './actions';
import LoginButton from './login-button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Form from 'next/form';

/*
* Export
*/
export default function FormClient({
    data
}: {
    data: Record<string, any>;
}) {
    const [actionState, setActionState] = useState<any>(null);

    return (
        <section>
            <h1>CLIEN FORM</h1>

            <Form action={placeholder}>
              <TextField name="name" defaultValue={actionState?.data?.name ?? 'Default Name'} />
              <TextField name="title" defaultValue={actionState?.data?.title ?? ''} />
              <LoginButton
                pendingText="Submitting..."
                fn={login}
                onActionState={setActionState}
              >Submit Button</LoginButton>
            </Form>
        </section>
    );
}