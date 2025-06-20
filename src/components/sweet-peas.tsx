import styles from './sweet-peas.module.css';
import { GetStaticProps } from 'next';
import { fetchShopifyProductsByTag } from '../../components/shopify/shopify';
import ShopifyProduct, {IShopifyProduct} from '@/components/shopify/shopify-product';
import { Parallax } from 'react-parallax';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const products = await fetchShopifyProductsByTag('Simple');

    if (!products || !Array.isArray(products)) {
      throw new Error('Invalid product data');
    }

    return {
      props: { products },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Failed to fetch flower subscription products:', error);
    return {
      props: { products: [] },
      revalidate: 3600,
    };
  }
};

interface Props {
  products: IShopifyProduct[];
}

export default function SweetPeas({ products }: Props) {
  try {
    return (
    <div className={styles.sweetPeasContainer}>
        <div className={styles.sweetPeasHeaderContainer}>
            <h1 className={styles.sweetPeasHeader}>Sweet Peas</h1>
            <p className={styles.sweetPeasText}>Sweet peas are beloved for their delicate, ruffled petals and sweet, nostalgic fragrance. These climbing annuals bloom in a rainbow of soft pastels and vibrant hues, adding romantic charm to gardens and bouquets alike. Though they appear dainty, sweet peas are surprisingly hardy and thrive in cooler climates, making them a springtime favorite for flower farmers and home gardeners. Their long stems and exceptional vase life make them ideal for cut flower arrangements, where their scent and color bring joy to any space.</p>
        </div>
        <div className={styles.sweetPeaShop}>
            {products && products.map((product, i) => (
                <ShopifyProduct key={i} product={product}/> ))}
        </div>
        <Parallax bgImage="/images/sweet-peas.png" strength={300} className={styles.parallaxContainer}>
            <div className={styles.parallaxContent} style={{ height: '500px' }}/>
        </Parallax>
    </div>
  );} catch (error) {
  console.error('Render error:', error);
  return <p>Error loading page.</p>;
}
}