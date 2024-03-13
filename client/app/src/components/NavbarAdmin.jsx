import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function NavbarAdmin() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className='navbar'>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">
            <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>Products</Link>
          </Button>
          <Button color="inherit"> 
            <Link to="/admin/create" style={{ textDecoration: 'none', color: 'inherit' }}>New Product</Link>
          </Button>
        </Toolbar>
      </AppBar>
      </div>
    </Box>
  );
}

export default NavbarAdmin;
