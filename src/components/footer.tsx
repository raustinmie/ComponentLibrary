import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Clock } from 'lucide-react';
import { siInstagram } from 'simple-icons/icons';
import styles from './footer.module.css';
import PrivacyPolicy from './legalese/privacy-policy';
import TermsOfService from './legalese/terms-of-service';
import { primaryEmail, primaryPhone } from '@/constants';

export default function Footer() {

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <div className={styles.contactInfo}>
          <div className={styles.contactInfoItem}>
            <Phone size={24} className={styles.icon} />
            <span className={styles.contactText}>{primaryPhone}</span>
          </div>
          <div className={styles.contactInfoItem}>
            <Mail size={24} className={styles.icon} />
            <span className={styles.contactText}>{primaryEmail}</span>
          </div>
          <div className={styles.contactInfoItem}>
            <Clock size={24} className={styles.icon} />
            <span className={styles.contactText}>Monday–Friday, 8am–8pm</span>
          </div>
        </div>
        <div className={styles.desktopCopyright}>
          <PrivacyPolicy />
          <TermsOfService />
          &copy; 2025 Harborview Web Design. All rights reserved.
        </div>
      </div>

      <div className={styles.center}>
        <Link href="/contact">
          <button className="cta-button">Get Started</button>
        </Link>
      </div>

      <div className={styles.right}>
        <div className={styles.logoContainer}>
            <Image
            src="/images/logotitleright.png"
            alt="Harborview Web Design Logo"
            width={992}
            height={220}
            className={styles.logo}
            />
        </div>
        <div className={styles.socialMediaSection}>
          <div className={styles.socialMediaText}>Follow us on:</div>
          <div
            className={styles.buttonSocialMedia}
            dangerouslySetInnerHTML={{ __html: siInstagram.svg }}
          />
        </div>
        <div className={styles.mobileCopyright}>
          <PrivacyPolicy />
          <TermsOfService />
          &copy; 2025 Harborview Web Design. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
