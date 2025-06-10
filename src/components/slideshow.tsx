import { useEffect, useState } from 'react';
import styles from './slideshow.module.css';

const Slideshow = () => {
  const images = [
    '/images/sara-headshot.avif',
    '/images/working together.avif',
    '/images/austin-headshot.avif',
    '/images/HWD-05.avif',
  ];

  // State to keep track of the current image index
const [currentIndex, setCurrentIndex] = useState(0);
const [prevIndex, setPrevIndex] = useState(0);
const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setAnimating(true);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);


    useEffect(() => {
    if (animating) {
      const timeout = setTimeout(() => setAnimating(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [animating]);

  return (
    <div className={styles.slideshowContainer}>
      {images.map((src, index) => {
        let className = styles.slideshowImage;

        if (index === currentIndex && animating) {
          className += ` ${styles.slideIn}`;
        } else if (index === prevIndex && animating) {
          className += ` ${styles.slideOut}`;
        } else if (index !== currentIndex) {
          return null; // Only render current and previous
        }

        return (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={className}
          />
        );
      })}
    </div>
  );
};

export default Slideshow;
