import React from 'react';
import { Button } from "@mui/material";

function RemoveButton({ onClick }) {
  return (
    <Button variant="outlined" color="secondary" onClick={onClick}>
      Ta bort
    </Button>
  );
}

export default RemoveButton;
