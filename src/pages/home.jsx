import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../API/productsApi';

const Home = () => {
  
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    if (loading) return (
      <div className="loading">
        <div className="spinner" />
      </div>
    );
    if (error) return <p className="text-muted">Error: {error}</p>;

    const mainProducts = products.filter(
        (product) => [2, 5, 9, 15].includes(product.id)
    );
    
    return (
    <>
        <div className='header'>
            <h1 className='title'>TechWear</h1>
            <h2 className='description'>Smart gadgets and stylish wear</h2>
            <Link to="/products"><button className='shop'>Shop Now</button></Link>
        </div>

        <div className='main'>
            {mainProducts.map(product => (
                <div key={product.id} className="allProducts all">
                    <img className="product-img" src={product.image} alt={product.title} />
                    <h3 className="product-title">{product.category}</h3>
                </div>
            ))}
        </div>
    </>
  )
}

export default Home
