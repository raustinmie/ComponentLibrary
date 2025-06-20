import styles from './shopify-buy-button.module.css';

interface ShopifyBuyButtonProps {
  variantId: string; // Shopify GID format: gid://shopify/ProductVariant/1234567890
  quantity?: number;
  shopDomain: string; // e.g., "your-shop-name.myshopify.com"
}

export default function ShopifyBuyButton({ variantId, quantity = 1, shopDomain }: ShopifyBuyButtonProps) {
  const numericId = variantId && variantId.split('/').pop();
  const checkoutUrl = `https://${shopDomain}/cart/${numericId}:${quantity}`;

  return (
        <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.buyButton}
        >
            <div className={styles.buyButtonContainer}>
                Buy Now
            </div>
        </a>
  );
}