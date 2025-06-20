import BuyButton from './buy-button';
import styles from './stripe-product.module.css';
import Image from 'next/image';

//Use this on the page where StripeProduct is being used
//   console.log('Fetching products from API');
//     const protocol = req.headers.host?.startsWith('localhost') ? 'http' : 'https';
//   const baseUrl = `${protocol}://${req.headers.host}`;

//   const res = await fetch(`${baseUrl}/api/stripe-products`);
//   const allProducts = await res.json();
// console.log('Fetched products:', allProducts);
//   const sweetPeas = allProducts.filter(
//     (p: StripeProductType) => p.metadata?.type === 'Sweet Pea'
//   );

//   return {
//     props: {
//       products: sweetPeas,
//     },
//   };

// type StripeProductType = {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   currency: string;
//   mode: 'payment' | 'subscription';
//   metadata?: Record<string, string>;
// };

// interface Props {
//   products: StripeProductType[];
// }

interface IStripeProductProps {
  priceId: string;
  title: string;
  image: string;
  price: number;
  description?: string;
  mode: 'subscription' | 'payment';
}

export default function StripeProduct({ priceId, title, image, price, description, mode }: IStripeProductProps) {
  console.log('props', { priceId, title, image, price, description, mode });
    return (
    <div className={styles.productContainer}>
      <h1 className={styles.title}>{title}</h1>
        <Image src={image} alt={title} className={styles.image} width={250} height={250}/>
      <p className={styles.price}>{price}</p>
      {description && <div className={styles.description}>description</div>}
      <BuyButton priceId={priceId} mode={mode} />
    </div>
  );
}
