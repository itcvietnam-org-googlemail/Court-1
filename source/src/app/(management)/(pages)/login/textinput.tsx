'use client';

import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';

export default function TextInput({
    defaultValue,
    ...props
}: {} & TextFieldProps) {
    const [value, setValue] = useState(defaultValue);

    return <TextField value={value} {...props} />
}