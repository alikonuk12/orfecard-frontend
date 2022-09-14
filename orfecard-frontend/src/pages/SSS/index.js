import React from 'react';
import { useSelector } from 'react-redux';
import { HEADER, FIRST, SECOND, THIRD, FOURTH, FIFTH, SIXTH, SEVENTH, EIGHTH, NINTH, TENTH } from './const';
import styles from './index.module.scss';

const SSS = () => {
    const { mode } = useSelector(state => state.view);

    return (
        <div className={mode === 'DESKTOP' ? styles.container : styles.mobileContainer}>
            <div className={styles.header}>{HEADER}</div>
            <div className={styles.content}>{FIRST}</div>
            <div className={styles.content}>{SECOND.map(el => <div>{el}</div>)}</div>
            <div className={styles.content}>{THIRD.map(el => <div>{el}</div>)}</div>
            <div className={styles.content}>{FOURTH.map(el => <div>{el}</div>)}</div>
            <div className={styles.content}>{FIFTH.map(el => <div>{el}</div>)}</div>
            <div className={styles.content}>{SIXTH.map(el => <div>{el}</div>)}</div>
            <div className={styles.content}>{SEVENTH.map(el => <div>{el}</div>)}</div>
            <div className={styles.content}>{EIGHTH.map(el => <div>{el}</div>)}</div>
            <div className={styles.content}>{NINTH.map(el => <div>{el}</div>)}</div>
            <div className={styles.content}>{TENTH.map(el => <div>{el}</div>)}</div>
        </div>
    );
}

export default SSS;