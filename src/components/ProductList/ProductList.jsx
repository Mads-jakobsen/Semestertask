import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProductList({ products, addToCart }) {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isFavorite = (productId) => favorites.includes(productId);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.rating} Rating</p>
          <img 
            src={product.images[0]} 
            alt={product.title} 
            style={{ width: '200px', height: 'auto' }} 
          />
          <p>{product.price} DKK</p>

          <button onClick={() => addToCart(product)}>Læg i kurv</button>

           <button
            onClick={() => toggleFavorite(product.id)}
            style={{
              marginLeft: '10px',
              color: isFavorite(product.id) ? 'gold' : 'gray',
              fontSize: '24px',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label={
              isFavorite(product.id)
                ? 'Fjern fra favoritter'
                : 'Tilføj til favoritter'
            }
          >
            {isFavorite(product.id) ? '★' : '☆'}
          </button> 

          




          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/productdetail/${product.id}`)}
            style={{ marginLeft: '10px' }}
          >
            se produktet
          </Button>
        </div>
      ))}
    </div>
  );
}