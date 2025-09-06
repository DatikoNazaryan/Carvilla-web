import { useState } from 'react';

import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

import cx from 'classnames';

import styles from './Slider.module.scss';

function Slider ({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.slider}>
     {images.length > 1 &&  <button onClick={goToPrevious} className={cx(styles.arrow, styles.left)}>
        <FaAngleLeft size={40} />
      </button>}
       <img className={styles.slide} src={images[currentIndex]} />
      {images.length > 1 && <button onClick={goToNext} className={cx(styles.arrow, styles.right)}>
        <FaAngleRight size={40} />
      </button>}
    </div>
  );
};

export default Slider;