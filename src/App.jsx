

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductList from './components/ProductList/ProductList';
import Header from './components/Header/Header';
import CartPage from './pages/CartPage';
import styles from './App.module.css';
import ProductsPage from './pages/Products';
import ProductDetail from './components/Product/ProductDetail';
import Checkout from './components/Checkout/Checkout';
import CookieBanner from './components/Cookies/Cookies';


import Form from './pages/About/About'
import Footer from './components/Footer/Footer';
import FrontPage from './pages/Home';





export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Fejl under hentning af produkter:', error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    setCart((prev) => {
      const index = prev.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
  };

  return (


    <BrowserRouter>
  <div className={styles.container}>
    <Header cartCount={cart.length} />
    <Routes>
      <Route
        path="/products"
        element={
          <ProductsPage
            products={products}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
          />
        }
      />
      <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
      <Route path="/productdetail/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/about" element={<Form />} />
      <Route path="/" element={<FrontPage />} />
      
      
      

    </Routes>
     

    <Footer />
  </div>
</BrowserRouter>

  );
}