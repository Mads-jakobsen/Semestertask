
import React, { useEffect, useState } from 'react';
import styles from '../App.module.css';
import { Link } from 'react-router-dom';
import CookieBanner from '../components/Cookies/Cookies';


export default function FrontPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        const selected = data.products.slice(22, 27);
        setProducts(selected);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className={styles.topProd}>
      <p>Vi tilbyder et stort udvalg produkter. Vi gør det nemt for dig at handle alt det, du har brug for hurtigt, trygt og til skarpe priser.
      vi har vi det hele samlet ét sted.</p>
      <h1>Top Produkter</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.images[0]} alt={product.title}/>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
             <Link className={styles.FrontLink} to="/products">Se vores produkter</Link>
           
          </div>
           
        ))}
     
       
      </div>



      <CookieBanner />
       
    </div>
   
  );
}