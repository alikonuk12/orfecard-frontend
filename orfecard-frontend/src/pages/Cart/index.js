import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TotalPriceCard } from '../../components';
import { REMOVE_FROM_CART, CLEAN_CART } from '../../store/reducers/cartReducer';
import { detectColor } from '../../util';
import styles from './index.module.scss';

const Cart = () => {
    const dispatch = useDispatch();
    const { cart, view: { mode } } = useSelector(state => state);

    const [total, setTotal] = useState(0);

    const handleRemoveFromCart = (pid) => {
        dispatch(REMOVE_FROM_CART({ pid }));
    }

    const handleCleanCart = () => {
        dispatch(CLEAN_CART());
    }

    useEffect(() => {
        const total = cart.reduce((prev, curr) => {
            prev += Number(curr?.product?.price);
            return prev;
        }, 0);
        setTotal(total);
    }, [cart]);

    return (
        <div className={mode === 'DESKTOP' ? styles.container : styles.mobileContainer}>
            <div className={styles.listContainer}>
                <div className={styles.outsideLine} />
                {!!cart.length ?
                    cart.map(({ pid, logo, product: { productName, price }, direction, color }, index) => (
                        <>
                            <div className={styles.elementContainer}>
                                {logo && <img className={styles.logo} src={logo} alt='logo' />}
                                <div className={styles.productDetail}>
                                    <div className={styles.productName}>{productName}</div>
                                    <div className={styles.direction}>Kart Tipi: {direction === 'vertical' ? 'Dikey' : 'Yatay'}</div>
                                    <div className={styles.color}>Kart Rengi: {detectColor(color)}</div>
                                </div>
                                <div className={styles.price}>₺{price}</div>
                                <img onClick={() => handleRemoveFromCart(pid)} className={styles.trash} src='/images/icons/trash_icon.svg' alt='trash' />
                            </div>
                            {cart.length !== index + 1 && <div className={styles.insideLine} />}
                        </>
                    )) :
                    <div className={styles.emptyCartMessage}>SEPET BOŞ</div>
                }
                <div className={styles.outsideLine} />
                {!!cart.length &&
                    <div className={styles.emptyCartButtonContainer}>
                        <div onClick={handleCleanCart} className={styles.emptyCartButton}>SEPETİ BOŞALT</div>
                    </div>
                }
            </div>
            <TotalPriceCard cart={cart} total={total} />
        </div>
    );
}

export default Cart;