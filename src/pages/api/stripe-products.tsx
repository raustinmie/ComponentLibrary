import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-05-28.basil'});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await stripe.products.list({ active: true });
    const prices = await stripe.prices.list({ active: true, expand: ['data.product'] });
    console.log('Fetched products:', products.data.length, 'and prices:', prices.data.length);
    // Join prices to products
    const productsWithPrices = prices.data.map(price => {
      const product = price.product as Stripe.Product;
      return {
        id: price.id,
        productId: product.id,
        name: product.name,
        description: product.description,
        image:  product.images?.[0] || '',
        price: (price.unit_amount ?? 0) / 100,
        currency: price.currency,
        mode: price.recurring ? 'subscription' : 'payment',
        metadata: product.metadata,
      };
    });

    res.status(200).json(productsWithPrices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to fetch products' });
  }
}