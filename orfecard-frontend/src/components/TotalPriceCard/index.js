import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TEXT } from './const';
import { isLoggedIn } from '../../util';
import styles from './index.module.scss';

const TotalPriceCard = ({ cart, total }) => {
    const { mode } = useSelector(state => state.view);
    const navigate = useNavigate();

    const [kdv, setKdv] = useState(0);
    const [generalTotal, setGeneralTotal] = useState(0);
    const [agreement, setAgreement] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleClickButton = async () => {
        if (!agreement) return setErrorMessage('Metinlerin onaylanması gereklidir');
        if (!isLoggedIn()) {
            navigate('/login', { replace: true });
            setErrorMessage('');
            return;
        }

        navigate('/odeme-yap', { state: { cart, total }});
    }

    const handleChangeAgreement = () => setAgreement(!agreement);

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
            <div className={styles.agreementContainer}>
                <div className={styles.agreementText}>
                    <Link to='/teslimat-ve-iade-kosullari' target='_blank'>Teslimat ve İade Koşulları</Link> ve <Link to='/mesafeli-satis-sozlesmesi' target='_blank'>Mesafeli Satış Sözleşmesi</Link>'ni okudum, anladım, onaylıyorum.
                </div>
                <input
                    type="checkbox"
                    value={agreement}
                    onChange={handleChangeAgreement}
                />
            </div>
            <div className={styles.errorMessage}>{errorMessage}</div>
            <div onClick={handleClickButton} className={styles.buttonContainer}>
                <div className={styles.button}>
                    <img
                        src='/images/icons/payment_button.svg'
                        alt='payment_icon'
                    />
                </div>
            </div>
        </div>
    );
}

export default TotalPriceCard;