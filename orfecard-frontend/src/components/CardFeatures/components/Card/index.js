import React from 'react';
import styles from './index.module.scss';

const Card = ({ title, text }) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.line} />
            <div className={styles.text}>{text}</div>
        </div>
    );
}

export default Card;