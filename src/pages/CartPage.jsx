
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from '../App.module.css';
import Counter from '../components/CounterItem/CounterItem'
import { useState } from "react";

export default function CartPage({ cart, removeFromCart }) {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(() =>
    cart.map(() => 1)
  );

  const updateQuantity = (index, newQty) => {
    const updated = [...quantities];
    updated[index] = newQty;
    setQuantities(updated);
  };

  const goToCheckout = () => {
    const updatedCart = cart.map((item, index) => ({
      ...item,
      quantity: quantities[index],
    }));
    navigate("/checkout", { state: { cart: updatedCart } });
  };

  return (
    <div className={styles.Cartcontent}>
      <h2>Din Kurv</h2>

      {cart.length === 0 ? (
        <p>
          Din kurv er tom tilføj nogle flere produkter... Tak fordi du handler hos os det sætter vi stor pris på! Vi er glade for, at du har valgt vores butik, og vi håber, at du finder præcis det, du søger. På denne side kan du se en detaljeret oversigt over alle de produkter, du har lagt i din indkøbskurv.
          Vi anbefaler, at du tager dig god tid til at gennemgå dine varer grundigt, så du er sikker på, at alt stemmer overens med din ordre.
          Når du har fundet alle de produkter, du ønsker at købe, kan du nemt tilføje dem til din kurv og fortsætte med at udforske vores store udvalg. Vores webshop er designet til at gøre det let og overskueligt for dig at finde nye favoritter og supplere dine køb med varer, der passer perfekt til dine behov.Skulle du få brug for hjælp undervejs hvad enten det drejer sig om spørgsmål til din ordre, brug af rabatkoder eller andet. Du kan kontakte os via telefon Endnu en gang tak, fordi du valgte os som din foretrukne butik. Vi glæder os til at hjælpe dig med at finde lige det, du mangler, og sikre, at din shopping oplevelse bliver så god som muligt.
        </p>
      ) : (
        <>
          {cart.map((product, index) => (
            <div key={index}>
              <h4>{product.title}</h4>
              <p>{product.price} DKK</p>
              <img src={product.thumbnail} alt="Cartimage" />
              <Counter
                initial={quantities[index]}
                onChange={(newQty) => updateQuantity(index, newQty)}
              />
              <button onClick={() => removeFromCart(product)}>Fjern</button>
            </div>
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={goToCheckout}
            className={styles.CheckoutButton}
          >
            Gå til kassen
          </Button>
        </>
      )}
    </div>
  );
}