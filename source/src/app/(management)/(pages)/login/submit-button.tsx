'use client'
 
import Button from '@mui/material/Button';
import { useState, useActionState, useEffect, startTransition } from 'react';
import type { ButtonProps } from '@mui/material/Button';
 
export default function SubmitButton({
    children,
    ...props
}: {
} & ButtonProps) {
    return (
        <div>
            <Button type="submit" {...props}>
                {children}
            </Button>
        </div>
    );
}