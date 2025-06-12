import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './Product.module.css'


export default function ProductDetail({ addToCart, removeFromCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Produktet kunne ikke hentes");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <p>Fejl: {error}</p>;
  if (!product) return <p>Indlæser...</p>;

  return (
    <div>
      <div>
    <div className={styles.Detail}>
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} width="200" />
      <p>{product.description}</p>
      <p>Pris: {product.price} DKK</p>
      <p>Kategori: {product.category}</p>





    </div>

     
          <div className={styles.rewiev}>
            <h4>Rewiev</h4>
            
            <p>{product.rating} ★ Rating</p>
            
             </div>
          
            
           
         
           
       


    
    
    </div>
    
    
    </div>






  );
}
