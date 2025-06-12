import { useState } from "react";

function Counter({ initial = 1, onChange }) {
  const [count, setCount] = useState(initial);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange?.(newCount);
  };

  const decrement = () => {
    const newCount = count > 1 ? count - 1 : 1;
    setCount(newCount);
    onChange?.(newCount);
  };

  const reset = () => {
    setCount(initial);
    onChange?.(initial);
  };

  return (
    <div className="counter">
      <h2>{count}</h2>
      <button onClick={increment}>&#x2B;</button>
      <button onClick={decrement}>&minus;</button>
    </div>
  );
}

export default Counter;