import { useState, type JSX } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import styles from '../styles/services.module.css';

interface ServiceSectionProps {
  title: string;
  serviceOptions: string | JSX.Element;
}

export default function ServicesSection({ title, serviceOptions }: ServiceSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.servicesSectionContainer}>
      <button
        className={`${styles.optionHeader} ${isExpanded ? styles.open : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <Image
          src="/images/logo-dark.png"
          alt="Lighthouse Logo"
          className={`${styles.logoOff} ${isExpanded ? styles.on : ''}`}
          width={32}
          height={32}
        />
        <Image
          src="/images/logo-light-light-on.png"
          alt="Lighthouse Logo (On)"
          className={`${styles.logoOn} ${isExpanded ? styles.on : ''}`}
          width={32}
          height={32}
        />
        <Image
          src="/images/logo-light.png"
          alt="Lighthouse Logo Light"
          className={styles.logoLight}
          width={32}
          height={32}
        />
        <h2 className={styles.title}>{title}</h2>
        <ChevronDown className={`chevron-icon ${isExpanded ? "rotate" : ''}`} size={24} />
      </button>
      <div className={`${styles.optionSection} ${isExpanded ? styles.open : ''}`}>
        {serviceOptions}
      </div>
    </div>
  );
}
