import './App.css';
import React, { useState } from 'react';
import Navbar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Index'
import Colecciones from './pages/Colecciones';
import ItemDetailContainer from './components/Item/ItemDetail/ItemDetailContainer';
import Nosotros from './pages/Nosotros';
import Cart from './components/Carrito/Cart';
import Orders from './components/Orders/Orders';
import Contacto from './pages/Contacto';
import CustomCarrito from './components/Carrito/CustomCarrito';

function App() {
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  return (
    <CustomCarrito>

      <Router>
        {isNavbarActive && <Navbar />}
        <Routes  >
          <Route path='/SuscripcionesVinos/' element={<Home setIsNavbarActive={setIsNavbarActive} />} />
          <Route path='/colecciones' element={<Colecciones />} />
          <Route path='/category/:id' element={<Colecciones />} />
          <Route path='/item/:id' element={<ItemDetailContainer />} />
          <Route path='/nosotros' element={<Nosotros />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
        </Routes >
      </Router>

    </CustomCarrito>
  );
}

export default App;
