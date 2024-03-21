// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, IconButton, Dialog } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartComponent from './CartComponet';


function Navbar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

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
                      <IconButton color="inherit" onClick={handleOpen}>
                              <ShoppingCartIcon />
                      </IconButton>
                      <Dialog open={open} onClose={handleClose}>
                          <CartComponent userId={1} />
                      </Dialog>
                  </Toolbar>
              </AppBar>
          </div>
      </Box>
  );
}

export default Navbar;