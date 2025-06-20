import { IShopifyProduct } from './shopify-product';

type ProductsResponse = {
  data: {
    products: {
      edges: { node: IShopifyProduct }[];
    };
  };
};
export async function fetchShopifyProductsByTag(tag: string) {
  const res = await fetch('https://qnu6ek-jv.myshopify.com/api/2023-01/graphql.json', {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          products(first: 10, query: "tag:${tag}") {
            edges {
              node {
                id
                title
                description
                handle
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      price {
                        amount
                        currencyCode
                      }
                        id
                    }
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });

  const json: ProductsResponse = await res.json();
  return json.data.products.edges.map(edge => edge.node);
}