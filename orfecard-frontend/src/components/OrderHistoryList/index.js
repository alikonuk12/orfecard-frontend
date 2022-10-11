import React, { useState } from 'react';
import { detectColor } from '../../util';
import styles from './index.module.scss';
import { NO_ORDER_HISTORY } from './const';

const OrderHistoryList = ({ data }) => {
    const [display, setDisplay] = useState(false);

    const handleSelectOrderDetail = (index) => {
        if (index === display) return setDisplay(undefined);
        setDisplay(index);
    };

    return (
        <div className={styles.container}>
            {!!data.length ?
                data.map(({ price, status, orderDetail }, index) =>
                    <div
                        className={styles.orderHistoryContainer}
                        onClick={() => handleSelectOrderDetail(index)}
                    >
                        <div className={styles.topSide}>
                            <div className={index === display ? styles.textContainerrow : styles.textContainercolumn}>
                                <div className={styles.text}>{status}</div>
                                {index === display && <div className={styles.text}>-</div>}
                                <div className={styles.text}>₺{price}+KDV</div>
                            </div>
                            <img
                                className={styles[`${index === display ? 'down' : 'up'}Arrow`]}
                                src='/images/icons/down_arrow.svg'
                                alt='arrow'
                            />
                        </div>
                        {orderDetail.map(({ product: { productName, price }, fullname, direction, color, logo }) =>
                            <div className={styles.orderDetail} aria-expanded={index === display}>
                                <div className={styles.header}>{productName} - ₺{price}</div>
                                <div className={styles.content}>
                                    <div className={styles.infoContainer}>
                                        <div className={styles.info}>{fullname}</div>
                                        <div className={styles.info}>Kart Tipi: {direction === 'vertical' ? 'Dikey' : 'Yatay'}</div>
                                        <div className={styles.info}>Kart Rengi: {detectColor(color)}</div>
                                    </div>
                                    <img className={styles.logo} src={logo} alt='logo' />
                                </div>
                            </div>
                        )}
                    </div>
                ) :
                <div className={styles.noOrderHistory}>{NO_ORDER_HISTORY}</div>
            }
        </div>
    );
}

export default OrderHistoryList;