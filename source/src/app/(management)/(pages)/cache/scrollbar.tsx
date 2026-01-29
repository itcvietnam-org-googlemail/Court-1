'use client';

import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-4';

export default function Scrollbar({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <Scrollbars
            autoHide={true}
            universal={true}
            style={{
                width: '100%',
                height: '100%'
            }}
        >
            {children}
        </Scrollbars>
    );
}