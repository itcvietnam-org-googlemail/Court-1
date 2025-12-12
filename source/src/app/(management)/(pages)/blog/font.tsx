'use client';

import Box from '@mui/material/Box';

export default function Font() {
    return (
        <Box>
            <Box sx={(theme) => ({
                ...theme.style.menu
            })}>Font Client Component</Box>
            <Box sx={{
                color: 'var(--mui-style-menu-color)'
            }}>Box 2 Client Component</Box>
        </Box>
    );
}