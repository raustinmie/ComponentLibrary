import { useCart } from '../../lib/cart-context';
import styles from './cart.module.css';
import { useState } from 'react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [error, setError] = useState<string | null>(null);

  // const SHOPIFY_DOMAIN = 'qnu6ek-jv.myshopify.com';

  const redirectToCheckout = async () => {
    const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        lines: cart.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
        })),
    }),
    };

    try{
        const response = await fetch('/api/shopify/checkout', request);
       
       if (!response.ok) {
        const data = await response.json();
        setError(data.errors?.[0] || 'Checkout failed.');
        return;
      }

        const data = await response.json();
        window.location.href = data;
    }
    catch (error) {
      setError('An unexpected error occurred.');
      console.log('Checkout error:', error);
    }
};

  return (
    <div className={styles.cartContainer}>
      {cart.map(item => (
        <div key={item.variantId}>
          <h3>{item.title}</h3>
          <p>${item.price}</p>
          <input
            type="number"
            value={item.quantity}
            min={1}
            onChange={(e) => updateQuantity(item.variantId, Number(e.target.value))}
          />
          <button onClick={() => removeFromCart(item.variantId)}>Remove</button>
        </div>
      ))}
      {error && <p className={styles.error}>{error}</p>}

      <button onClick={() => redirectToCheckout()} className={styles.checkoutButton}>Check out</button>
    </div>
  );
}