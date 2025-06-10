import { useState, JSX } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import styles from "../styles/faq.module.css";

interface FaqQuestionProps {
  question: string;
  answer: string | JSX.Element;
}

export default function FaqQuestion({ question, answer }: FaqQuestionProps) {
  const [questionOpen, setQuestionOpen] = useState(false);

  return (
    <div
      className="panel"
      onClick={() => setQuestionOpen(!questionOpen)}
      role="button"
      aria-expanded={questionOpen}
    >
      <h3 className={styles.faqQuestionContainer}>
        <Image
          src="/images/logo-dark.png"
          alt="Lighthouse Logo Off"
          width={24}
          height={24}
          className={`${styles.faqLogoOff} ${questionOpen ? styles.on : ""}`}
        />
        <Image
          src="/images/logo-dark-light-on.png"
          alt="Lighthouse Logo On"
          width={24}
          height={24}
          className={`${styles.faqLogoOn} ${questionOpen ? styles.on : ""}`}
        />
        <div className={`${styles.faqQuestion} ${questionOpen ? styles.open : ""}`}>
          {question}
        </div>
        <ChevronDown className={`chevron-icon ${questionOpen ? 'rotate' : ""}`} />
      </h3>
      <div className={`${styles.faqAnswer} ${questionOpen ? styles.open : ""}`}>
        {answer}
      </div>
    </div>
  );
}
