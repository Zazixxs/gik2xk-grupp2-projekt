import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import '../App.css';

function Home() {
  return (
    <div className="home">
      <h1>Välkommen till vår webbshop!</h1>
      <p>Utforska vårt breda sortiment av produkter och hitta det du letar efter.</p>
      <Link to="/ProductList">
        <Button variant="contained" color="primary">Se alla produkter</Button>
      </Link>
      <div className="home-image">
      </div>
    </div>
  );
}

export default Home;
