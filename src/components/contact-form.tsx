import { useState, ChangeEvent, FormEvent } from 'react';
import emailjs from 'emailjs-com';
import styles from "./contact-form.module.css";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    formData.message = formData.message.concat(`\n\nFrom: ${formData.email}`);
    console.log('Form submitted:', formData);

    emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setShowToast(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
      });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 10000);

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={styles.contactFormContainer}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
        <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.formInput}
            required
        />
        <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.formInput}
            required
        />
        <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={styles.formTextarea}
            required
        />
        <button type="submit" className={styles.formButton}>
            Send Message
        </button>
        </form>
        {showToast && <div className={styles.toast}>Thanks for reaching out!</div>}
    </div>
  );
}
