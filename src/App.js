import Home from './pages/home';
import './style/style.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Products from './pages/products';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Alert from './pages/alert';
import { useEffect, useState } from 'react';

function App() {
  

  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("count");
    return saved ? JSON.parse(saved) : 0;
  });

  const [price, setPrice] = useState(() => {
    const saved = localStorage.getItem("price");
    return saved ? JSON.parse(saved) : 0;
  });

  const [info, setInfo] = useState(() => {
    const saved = localStorage.getItem("information");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem("information", JSON.stringify(info));
  }, [info]);

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  useEffect(() => {
    localStorage.setItem("price", JSON.stringify(price));
  }, [price]);
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="nav">
          <div><Link to="/"><p className="nav-link">Home</p></Link></div>
          <div><Link to="/products"><p className="nav-link">Products</p></Link></div>
          <div><Link to="/cart"><p className="nav-link">Cart</p></Link></div>
        </nav>

        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/products' element={<Products setCount={setCount} setPrice={setPrice} setInfo={setInfo}/>} />
            <Route path='/cart' element={<Cart info={info} price={price} setInfo={setInfo} setPrice={setPrice} setCount={setCount}/>} />
            <Route path='/checkout' element={<Checkout info={info} price={price} setInfo={setInfo} setPrice={setPrice} setCount={setCount}/>} />
            <Route path="*" element={<Alert/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;