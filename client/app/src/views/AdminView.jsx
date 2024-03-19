import React, { useEffect, useState }from "react";
import ProductList from "./ProductList";
import { Button } from "@mui/material";
import '../App.css';
import NavbarAdmin from "../components/NavbarAdmin";
import ProductListAdmin from "./ProductListAdmin";

function AdminView() {

  return (
    <div>
      <NavbarAdmin />
      <ProductListAdmin />
    </div>
  );
}


export default AdminView;