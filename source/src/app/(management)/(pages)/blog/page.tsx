import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Font from './font';

export default function Page() {
  const sxj = {
    color: 'error.main',
    zIndex: 'tooltip',
    typography: 'title',
    bgcolor: 'darker.main',
    background: 'red',
    menu: {
      background: 'red',
      main: {
        fontWeight: 'normal',
        fontStyle: 'italic'
      }
    }
  };
  const sx = JSON.parse(JSON.stringify(sxj));

  return (
    <div>
      <h1>Blog Page</h1>
      <hr />
      <div>
        <Box sx={{
          color: 'var(--mui-feature-menu-color)'
        }}>BOX CUSTOM VARIANT</Box>
        <hr />
        <Font />
        <hr />
        <List feature='menu' variant='default' component="div">List</List>
        <hr />
        <Paper feature='menu' variant='main'>Menu Paper</Paper>
        <hr />
        <Box sx={sx.menu}>Box</Box>
        <hr />
        <Button variant='custom'>Button</Button>
      </div>
    </div>
  );
}