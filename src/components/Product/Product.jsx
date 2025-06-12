export default function Product({ product, addToCart, RemoveFromCart, cart }) {
  const isInCart = cart?.some(p => p.id === product.id);

  return (

    
    <div>
      <img 
        src={product.image} 
        alt={product.title} 
 
      />
      <h3>{product.title}</h3>
      <p>{product.price} DKK</p>

      <button onClick={() => addToCart(product)}>
        Tilføj til kurv
      </button>



      
      <button 
        onClick={() => RemoveFromCart(product)} 
  

        disabled={!isInCart}
      >
        Fjern
      </button>



     
    
    </div>
  );
}
