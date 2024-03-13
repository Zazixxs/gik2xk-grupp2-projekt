import React, { useEffect, useState }from "react";
import ProductList from "./ProductList";
import { Button } from "@mui/material";
import '../App.css';
import NavbarAdmin from "../components/NavbarAdmin";
function AdminView() {

  return (
    <div>
      <NavbarAdmin />
      <h1>Adminläge</h1>
      <ProductList />
    </div>
  );
}


export default AdminView;