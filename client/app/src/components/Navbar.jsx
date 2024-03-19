import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Cart from './Cart'; // Importera Cart-komponenten

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
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
          <Button color="inherit" onClick={handleClickOpen}>
            Cart
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Varukorg</DialogTitle>
            <DialogContent>
              <Cart />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Stäng
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
      </div>
    </Box>
  );
}

export default Navbar;
