import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../API/productsApi';

const Products = ({setCount, setPrice, setInfo}) => {

    const [selectedCategory, setSelectedCategory] = useState("all");

    const [selectedSort, setSelectedSort] = useState("byCategory");

    const addToCart = (e) => {
        const price = Number(e.target.value);
        const data = JSON.parse(e.target.dataset.product);

        setInfo(prevInfo => {
            const existingProduct = prevInfo.find(item => item.id === data.id);
        
            if (existingProduct) {

              return prevInfo.map(item =>
                item.id === data.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            } else {

              return [...prevInfo, { ...data, quantity: 1 }];
            }
        });

        setPrice(total => total + price);
        setCount(prev => prev + 1);
    };

  
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

    const filteredProducts =
    selectedCategory === "all"
    ? products
    : products.filter((product) => product.category === selectedCategory);


    const sortedProducts = [...filteredProducts];
    if (selectedSort === "high") {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "low") {
        sortedProducts.sort((a, b) => a.price - b.price);
    }


    return (
    <>

        <div className='header headProducts'>
            <h1 className='title'>TechWear</h1>
            <h2 className='description'>Smart gadgets and stylish wear</h2>
        </div>

        <label htmlFor="category" className="label">Choose a category:</label>
        <select className='filter' name="category" id="categories" value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="men's clothing">men's clothing</option>
            <option value="jewelery">jewelery</option>
            <option value="electronics">electronics</option>
            <option value="women's clothing">women's clothing</option>
        </select>

        <label htmlFor="sort" className="label">Sort by price:</label>
        <select className='filter' name="sort" id="sort" value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}>
            <option value="byCategory">By category</option>
            <option value="high">High to low</option>
            <option value="low">Low to high</option>
        </select>

        <div className='filtered'>
            {sortedProducts.map(product => (
                <div className='allProducts' key={product.id}>
                    <img className="product-img" src={product.image} alt={product.title} />
                    <h3 className="product-title">{product.title}</h3>
                    <div className="add">
                        <p className='price'>${product.price}</p>
                        <button className='cart'
                        data-product={JSON.stringify(product)}
                        value={product.price}
                        onClick={addToCart}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}

export default Products
