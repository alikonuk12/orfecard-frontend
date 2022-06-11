import React from 'react';
import styles from './index.module.scss';
import { ELEMENT } from './const';

const PrimaryFeatures = () => {
    return (
        <div className={styles.container}>
            {ELEMENT.map(({ title, text, url }) =>
                <div className={styles.elementContainer} key={title}>
                    <img
                        className={styles.image}
                        src={url}
                        alt='primary_features'
                    />
                    <div className={styles.title}>{title}</div>
                    <div className={styles.text}>{text}</div>
                </div>
            )}
        </div>
    );
}

export default PrimaryFeatures