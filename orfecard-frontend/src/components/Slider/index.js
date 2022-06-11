import React, { useState } from 'react';
import { Arrow } from './components';
import styles from './index.module.scss';

const Slider = ({ count }) => {
    const [slideIndex, setSlideIndex] = useState(1);

    const DIRECTION = {
        PREV: 'prev',
        NEXT: 'next'
    };

    const nextSlide = () => {
        if (slideIndex !== count) return setSlideIndex(slideIndex + 1);
        setSlideIndex(1);
    }

    const prevSlide = () => {
        if (slideIndex !== 1) return setSlideIndex(slideIndex - 1);
        setSlideIndex(count);
    }

    const moveDot = index => setSlideIndex(index);

    return (
        <div className={styles.container}>
            <div>
                {Array
                    .from({ length: count })
                    .map((_, index) =>
                        <img
                            key={index}
                            className={slideIndex === index + 1 ? styles.slide_flex : styles.slide_none}
                            src={`images/slider_images/image_${index + 1}.jpg`}
                            alt='slider_images'
                        />
                    )
                }
            </div>
            <Arrow moveSlide={prevSlide} direction={DIRECTION.PREV} />
            <Arrow moveSlide={nextSlide} direction={DIRECTION.NEXT} />
            <div className={styles.dotsContainer}>
                {Array
                    .from({ length: count })
                    .map((_, index) => (
                        <div
                            onClick={() => moveDot(index + 1)}
                            className={slideIndex === index + 1 ? styles.dotActive : styles.dot}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Slider;