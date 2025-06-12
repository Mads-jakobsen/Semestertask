import { useForm } from 'react-hook-form';
import { useState } from 'react';
import DiscountCode from './Discount';
import styles from './Checkout.module.css';
import { useLocation } from 'react-router-dom';

export default function Checkout() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [discount, setDiscount] = useState(null);
  const [shippingFee] = useState(49);
  const location = useLocation();

  const cart = location.state?.cart || [];



const calculateTotal = () => {
  const subtotal = cart.reduce(
    (sum, product) =>
      sum + (Number(product.price) || 0) * (product.quantity || 1),
    0
  );

  let total = subtotal;

  if (discount) {
    if (discount.type === "percent") {
      total -= (subtotal * discount.value) / 100;
    } else if (discount.type === "fixed") {
      total -= discount.value;
    } else if (discount.type === "freeShipping") {
    } else {
      total += shippingFee;
    }
  } else {
    total += shippingFee;
  }

  return total > 0 ? Number(total).toFixed(1) : "0.0";
};

  const onSubmit = (data) => {
    alert(`Tak for din ordre, ${data.name}! Total: ${calculateTotal()} kr.`);
  };

  if (!cart || cart.length === 0) {
    return <p>Din kurv er tom.</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Betal</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label>Navn</label>
        <input {...register("name", { required: true })} />
        {errors.name && <p className={styles.error}>Navn er påkrævet</p>}

        <label>Email</label>
        <input {...register("email", { required: true })} />
        {errors.email && <p className={styles.error}>Email er påkrævet</p>}

        <label>Adresse</label>
        <input {...register("address", { required: true })} />
        {errors.address && <p className={styles.error}>Adresse er påkrævet</p>}


<div className={styles.div}>
  <h4>Produkter:</h4>
  {cart.map((product, index) => (
    <div key={index}>
      <p>
        {product.title} - {product.quantity} stk - {product.price * product.quantity} kr
      </p>
    </div>
  ))}
  
  <p>Fragt: {discount?.type === "freeShipping" ? "0 kr" : `${shippingFee.toFixed(1)} kr`}</p>

</div>



        <DiscountCode onApply={setDiscount} />

        <h3>Total: {calculateTotal()} kr</h3>

        <button type="submit" className={styles.button}>Køb ordre</button>
      </form>
    </div>
  );
}