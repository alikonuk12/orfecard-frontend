import React from "react";
import styles from './index.module.scss';

const Arrow = ({ direction, moveSlide }) => {
  return (
    <div
      onClick={moveSlide}
      className={direction === "next" ? styles.nextArrow : styles.prevArrow}
    >
      <img src={direction === "next" ? '/images/icons/right_arrow.svg' : '/images/icons/left_arrow.svg'} alt='arrow' />
    </div>
  );
}

export default Arrow;