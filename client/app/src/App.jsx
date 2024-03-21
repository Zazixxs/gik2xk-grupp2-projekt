import React, { useState } from 'react';
import UserContext from './components/UserContext';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import ProductList from "./views/ProductList";
import Contact from "./views/Contact";
import ProductView from "./views/ProductView";
import AdminView from "./views/AdminView";
import AddView from './views/AddView';
import UpdateView from './views/UpdateView';

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <Router>
        <Navbar />
        <Routes>  
          <Route path='/admin' element={<AdminView />}/>
          <Route path="/" element={<Home />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route exact path="/admin/post" element={<AddView />} />
          <Route path="/update/:id" element={<UpdateView />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
