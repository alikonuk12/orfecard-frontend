import React from 'react';
import { useSelector } from 'react-redux';
import { HEADER, CONTENT } from './const';
import styles from './index.module.scss';

const About = () => {
    const { mode } = useSelector(state => state.view);

    return (
        <div className={mode === 'DESKTOP' ? styles.container : styles.mobileContainer}>
            <div className={styles.header}>{HEADER}</div>
            <div className={styles.content}>{CONTENT}</div>
        </div>
    );
}

export default About;