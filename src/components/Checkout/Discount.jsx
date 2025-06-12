
import { useState } from 'react';
import styles from './Discount.module.css';


const validCodes = {
  'RABAT10': { type: 'percent', value: 10 },
  'FAST50': { type: 'fixed', value: 50 },
  'FRIFRAGT': { type: 'freeShipping', value: 0 },
};

export default function DiscountCode({ onApply }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  // Funktion der tjekker og anvender rabatkoden
  const handleApply = () => {
    const trimmed = code.trim().toUpperCase();
    if (validCodes.hasOwnProperty(trimmed)) {
      const data = validCodes[trimmed];
      setMessage(`✅ Koden "${trimmed}" er gyldig.`);
      onApply({ ...data, code: trimmed }); // Sender type og value
    } else {
      setMessage('❌ Ugyldig rabatkode.');
      onApply(null); // Fjerner rabat
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3>Rabatkode</h3>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Indtast rabatkode"
          className={styles.input}
        />
        <button onClick={handleApply} className={styles.button}>Anvend</button>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

