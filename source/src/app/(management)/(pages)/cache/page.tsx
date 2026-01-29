import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import Scrollbar from './scrollbar';
import { randomInt } from 'crypto';
import { cookies, headers } from 'next/headers';
import ExcelJS from 'exceljs';

async function get(token?: boolean): Promise<string> {
    if (token) {
        (await cookies()).set('a', 'a');

        return 'Has cookies';
    }

    return 'No cookies';
}

export default async function Page() {
    'use cache';

    //Get
    const result = get();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Danh sách người dùng');
    worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Họ Tên', key: 'name', width: 32 },
        { header: 'Email', key: 'email', width: 32 },
    ];
    
    //Return
    return (
        <div>
            <h1>Page::Cache</h1>
            <p>{result}</p>
            <Box sx={{
                width: '280px',
                height: '100vh',
                bgcolor: '#f5f5f5'
            }}>
                <Scrollbar>
                    <List>
                        {Array(100).fill(0).map((value, index) => (
                            <ListItem key={index}>
                                <Link href='/login'>
                                    <ListItemButton>Item {index}</ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Scrollbar>
            </Box>
        </div>
    );
}