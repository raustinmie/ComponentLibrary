import React, { useEffect, useState} from 'react';
import styles from './big-cartel-widget.module.css';

// Requires a proxy route at /api/products
// to fetch products from Big Cartel due to CORS issues
interface Variant {
    id: number,
    name: string,
    price: number,
    sold_out: boolean,
    has_custom_price: boolean,
    option_group_values: []
};

interface BigCartelImage {
    url: string,
    width: number,
    height: number
};

export interface BCProduct {
    id: number;
    name: string,
    permalink: string,
    position: 1,
    price: number,
    default_price: number,
    tax: number,
    url: string,
    status: string,
    on_sale: boolean,
    created_at: Date,
    description: string,
    has_option_groups: boolean,
    options: Variant[];
    images: BigCartelImage[],
    artists: [],
    categories: [],
    option_groups: []
};

function BigCartelWidget() {

    const [products, setProducts] = useState<BCProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  fetch("/api/products")
    .then(async (res) => {
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const data = await res.json();
      setProducts(data);
    })
    .catch((err) => {
      console.error("Failed to fetch products:", err);
      setError("Could not load products at this time.");
    })
    .finally(() => setLoading(false));
    console.log(error)
}, []);

  if (loading) return <p>Loading products…</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No products available right now.</p>;

  return (
    <div className={styles.storeContainer}>
    {products && products.map((product: BCProduct) => (
        <div key={product.id} className={styles.productCard}>
          <h2 className={styles.productTitle}>{product.name}</h2>
            { product.images && product.images.length > 0 && (<img
                src={product.images.length > 0 ? product.images[0].url : '/images/default-product.png'}
                alt={product.name}
                className={styles.productImage}/> )}
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
          <a href={`https://harborviewwebdesign.bigcartel.com${product.url}`} className={styles.productLink}>View Product</a>
        </div>
      ))
    }
    </div>
  );
}

export default BigCartelWidget;