import React, { useState, useEffect } from 'react';
import useFetch from '../useFetch';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

function Cart() {
    const { data: items, isLoading, isError, refetch } = useFetch('/api/cart');
    const [open, setOpen] = useState(false);

    const removeFromCart = async (itemId) => {
        const response = await fetch(`/api/cart/${itemId}`, { method: 'DELETE' });
        if (response.ok) {
            refetch();
        }
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * item.amount, 0);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading cart.</div>;

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Visa varukorg
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Varukorg</DialogTitle>
                <DialogContent>
                    {items.map(item => (
                        <div key={item.id}>
                            <p>{item.name} - {item.amount} st</p>
                            <Button onClick={() => removeFromCart(item.id)}>Ta bort</Button>
                        </div>
                    ))}
                    <p>Totalt: {calculateTotal()} kr</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Stäng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Cart;
