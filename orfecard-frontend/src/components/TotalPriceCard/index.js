import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TEXT } from './const';
import { isLoggedIn } from '../../util';
import styles from './index.module.scss';

const TotalPriceCard = ({ total }) => {
    const { mode } = useSelector(state => state.view);
    const navigate = useNavigate();

    const [kdv, setKdv] = useState(0);
    const [generalTotal, setGeneralTotal] = useState(0);

    const handleClickButton = () => {
        if (!isLoggedIn()) return navigate('/login', { replace: true });
    }

    useEffect(() => {
        if (typeof total === 'number') {
            const kdv = total * 0.18;
            setKdv(kdv);
            const generalTotal = total + kdv;
            setGeneralTotal(generalTotal);
        }
    }, [total]);

    return (
        <div className={mode === 'DESKTOP' ? styles.container : styles.mobileContainer}>
            <div className={styles.priceContainer}>
                <div className={styles.textContainer}>
                    <div className={styles.text}>{TEXT.TOTAL}</div>
                    <div className={styles.text}>₺{total}</div>
                </div>
                <div className={styles.line} />
                <div className={styles.textContainer}>
                    <div className={styles.text}>{TEXT.KDV}</div>
                    <div className={styles.text}>₺{kdv}</div>
                </div>
                <div className={styles.line} />
                <div className={styles.textContainer}>
                    <div className={styles.text}>{TEXT.GENERAL_TOTAL}</div>
                    <div className={styles.text}>₺{generalTotal}</div>
                </div>
            </div>
            <div onClick={handleClickButton} className={styles.buttonContainer}>
                <div className={styles.button}>{TEXT.BUTTON}</div>
            </div>
        </div>
    );
}

export default TotalPriceCard;