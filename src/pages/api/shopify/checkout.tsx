// pages/api/shopify/checkout.ts
import { shopifyFetch } from '../../../lib/shopify-fetch';
import type { NextApiRequest, NextApiResponse } from 'next';
type GraphQLError = {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: { [key: string]: any };
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lines } = req.body;
console.log('Received lines:', lines);
  const query = `
mutation CartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
    }
    userErrors {
      field
      message
    }
  }
}
  `;

  const variables = {
    input: {
      lines, // [{mechandiseId: 'gid://Shopify/ProductVariant/...', quantity: 2}]
    },
  };

  const data = await shopifyFetch({ query, variables });
console.log('Checkout data:', data);
  if (data.errors || data.data?.cartCreate?.userErrors?.length > 0) {
    console.error('Shopify checkout error:', data.errors || data.data.cartCreate?.userErrors);
  const errorMessages =
    data.data?.cartCreate?.userErrors?.map((e: GraphQLError) => e.message) ||
    data.errors?.map((e: GraphQLError) => e.message) ||
    ['Unknown error'];
    
  return res.status(400).json({ errors: errorMessages });  }

  res.status(200).json(data.data.cartCreate.cart.checkoutUrl);
}
