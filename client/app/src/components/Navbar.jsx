import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className='navbar'>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit"> 
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
          </Button>
          <Button color="inherit">
            <Link to="/ProductList" style={{ textDecoration: 'none', color: 'inherit' }}>Products</Link>
          </Button>
          <Button color="inherit">
            <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>
          </Button>
        </Toolbar>
      </AppBar>
      </div>
    </Box>
  );
}

export default Navbar;
