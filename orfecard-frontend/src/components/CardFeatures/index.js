import React from 'react';
import Card from './components/Card';
import { FEATURES } from './const';
import styles from './index.module.scss';

const CardFeatures = () => {
    return (
        <div className={styles.container}>{FEATURES.map(({ title, text }) => <Card key={title} title={title} text={text} />)}</div>
    );
}

export default CardFeatures;