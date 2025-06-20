import React from 'react';

interface IBuyButtonProps {
  priceId: string;
  mode: 'payment' | 'subscription';
  quantity?: number;
}
export default function BuyButton({ priceId, mode, quantity }: IBuyButtonProps) {
  const handleClick = async () => {
    const res = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lineItems: [
          {
            price: priceId,
            quantity: quantity || 1,
          },
        ],
        mode: mode, // or 'subscription'
      }),
    });

    const data = await res.json();
    if (data.sessionUrl) window.location.href = data.sessionUrl;
  };

  return <button onClick={handleClick}>Buy Now</button>;
}

