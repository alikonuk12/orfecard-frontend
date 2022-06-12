import React from 'react';
import Card from './components/Card';
import { HEADER, FEATURES } from './const';
import styles from './index.module.scss';

const CardFeatures = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>{HEADER}</div>
            <div className={styles.featuresContainer}>
                {FEATURES.map(({ title, text }) => <Card key={title} title={title} text={text} />)}
            </div>
        </div>
    );
}

export default CardFeatures;