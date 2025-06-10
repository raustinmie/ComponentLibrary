import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div
        className={styles.logo}
        onClick={() => router.push('/')}
        role="button"
        aria-label="Go to home"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' ? router.push('/') : null)}
      >
        <div className={styles.logoImageContainer}>
            <Image
            src="/images/logotitle.avif"
            alt="Harborview Web Design Logo"
            width={992}
            height={220}
            className={styles.logoImage}
            />
        </div>
      </div>

      <button
        className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        ☰
      </button>

      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        <ul className={styles.navList}>
          <li className={styles.listItem}><Link href="/">Home</Link></li>
          <li className={styles.listItem}><Link href="/about">About</Link></li>
          <li className={styles.listItem}><Link href="/services">Services</Link></li>
          <li className={styles.listItem}><Link href="/faq">FAQ</Link></li>
          <li className={styles.listItem}><Link href="/blog">Blog</Link></li>
          <li className={styles.listItem}><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
