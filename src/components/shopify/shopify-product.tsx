import styles from './shopify-product.module.css';
import Image from 'next/image';
import ShopifyBuyButton from './shopify-buy-button';
import { useState } from 'react';
import { useCart } from '../../lib/cart-context';

//Insert this code into the page where it is being used
// export const getStaticProps: GetStaticProps = async () => {
//   const products = await fetchShopifyProductsByTag('Simple');
//   return {
//     props: { products },
//     revalidate: 3600,
//   };
// };

export interface IShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images?: {
    edges: {
      node: {
        url: string;
        altText?: string;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
      };
    }[];
  };
  tags: string[];
}

export default function ShopifyProduct({ product }: { product: IShopifyProduct }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const variant = product.variants.edges[0].node;

    const handleAdd = () => {
    addToCart({
      variantId: variant.id,
      title: product.title,
      price: variant.price.amount,
    });
  };

    return (
    <div className={styles.productContainer}>
      <h1 className={styles.title}>{product.title}</h1>
        {product.images && <Image src={product.images.edges[0].node.url} alt={product.title} className={styles.image} width={250} height={250}/>}
      <p className={styles.price}>{`$${product.variants.edges[0].node.price.amount}`}</p>
      {product.description && <div className={styles.description}>description</div>}
              <div className={styles.quantityContainer}>
        <label>
          Quantity:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className={styles.quantityInput}
          />
        </label>
      </div>
        <ShopifyBuyButton variantId={variant.id} shopDomain='qnu6ek-jv.myshopify.com' />
        <button onClick={handleAdd}>Add to Cart</button>

    </div>
  );
}