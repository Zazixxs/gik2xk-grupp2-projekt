import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function NavbarAdmin() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className='navbar'>
      <AppBar position="static">
        <Toolbar>
          <h5>Admin Läge</h5>

          <Button color="inherit">
            <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>Admin Home</Link>
          </Button>
          <Button color="inherit"> 
            <Link to="post" style={{ textDecoration: 'none', color: 'inherit' }}>Add Product</Link>
          </Button>
        </Toolbar>
      </AppBar>
      </div>
    </Box>
  );
}

export default NavbarAdmin;
