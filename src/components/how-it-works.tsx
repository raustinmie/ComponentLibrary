import { Lightbulb, Hammer, Rocket } from "lucide-react";
import styles from "./how-it-works.module.css";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Lightbulb size={48} className={`${styles.icon} ${styles.blue}`} />,
      title: "1. Tell Us What You Need",
      description:
        "We’ll chat about your business, your goals, and what you want your website to do. Whether you have a full plan or just an idea, we’ll help you shape it.",
    },
    {
      icon: <Hammer size={48} className={`${styles.icon} ${styles.green}`} />,
      title: "2. We Design & Build",
      description:
        "We’ll create a custom website tailored to your brand and needs. You approve the design, and we take care of the rest: construction, hosting, and launch.",
    },
    {
      icon: <Rocket size={48} className={`${styles.icon} ${styles.purple}`} />,
      title: "3. You Go Live",
      description:
        "Your site goes live and starts working for your business. Need changes later? They’re included with your subscription.",
    },
  ];

  return (
    <section className={styles.container} aria-label="How Harborview Web Design Works">
      <h2 className={styles.title}>How It Works</h2>
      <div className={styles.steps}>
        {steps.map((step, index) => (
          <article key={index} className={styles.step}>
            {step.icon}
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
