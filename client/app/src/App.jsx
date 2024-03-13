import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import ProductList from "./views/ProductList";
import Contact from "./views/Contact";
import ProductView from "./views/ProductView";
import AdminView from "./views/AdminView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path='/admin' element={<AdminView />}/>
      </Routes>
    </Router>
  );
}

export default App;
