import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getorderhistory } from '../../api/account';
import { OrderHistoryList } from '../../components';
import { ORDER_HISTORY } from './const';
import styles from './index.module.scss';

const OrderHistory = () => {
    const [orderhistory, setOrderHistory] = useState([]);
    const { mode } = useSelector(state => state.view);

    const handleGetOrderHistory = async () => {
        const orderhistory = await getorderhistory();
        setOrderHistory(orderhistory);
    }

    useEffect(() => {
        handleGetOrderHistory();
    }, []);
    return (
        <div className={mode === 'DESKTOP' ? styles.container : styles.mobileContainer}>
            <div className={styles.listContainer}>
                <div className={styles.header}>{ORDER_HISTORY}</div>
                <div className={styles.line} />
                <OrderHistoryList data={orderhistory} />
                <div className={styles.line} />
            </div>
        </div>
    );
}

export default OrderHistory;
