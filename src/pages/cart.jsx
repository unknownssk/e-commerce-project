import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ info, setInfo, setCount, setPrice, price }) => {

  const plusPiece = (id) => {
    const thisProduct = info.find(product => product.id === id);
  
    if (!thisProduct) return;

    const updated = info.map(product =>
      product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setInfo(updated);
    setPrice(total => total + thisProduct.price);
    setCount(prev => prev + 1);
  };

  const minusPiece = (id) => {
    const thisProduct = info.find(product => product.id === id);
  
    if (!thisProduct) return;

    const updated = info.map(product =>
      product.id === id
        ? { ...product, quantity: product.quantity - 1}
        : product
    
    ).filter(product => product.quantity > 0);

    setInfo(updated);
    setPrice(total => total - thisProduct.price);
    setCount(prev => prev - 1);
  };

  const remove = (id) => {
    const thisProduct = info.find(product => product.id === id);
  
    if (!thisProduct) return;
  
    const updated = info.filter(product => product.id !== id);
  
    setInfo(updated);
    setPrice(total => total - thisProduct.price * thisProduct.quantity);
    setCount(prev => prev - thisProduct.quantity);
  };

  if (info.length === 0) {
    return <h1 className="alert">No products in cart</h1>;
  }

  return (
    <div>
      {info.map(product => (
        <div key={product.id} className="cart-item" style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Quantity: {product.quantity}</p>

          <button className="btn-qty" onClick={() => plusPiece(product.id)}>+</button>
          <button className="btn-qty" onClick={() => minusPiece(product.id)}>-</button>
          <button className="btn-remove" onClick={() => remove(product.id)}>Remove</button>
        </div>
      ))}

      <h2 className="text-xl font-semibold">Total: ${price.toFixed(2)}</h2>

      <Link to="/checkout"><button className='checkout'>checkout</button></Link>
    </div>
  );
};

export default Cart;
