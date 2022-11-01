import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getaccount, getallaccount, postaccount, putaccount } from '../../api/accountForAdmin';
import { getcard, getallcard, postcard, putcard } from '../../api/card';
import { getorderdetail, getallorderdetail, postorderdetail, putorderdetail } from '../../api/orderdetail';
import { getorderhistory, getallorderhistory, postorderhistory, putorderhistory } from '../../api/orderhistory';
import { getproduct, getallproduct, postproduct, putproduct } from '../../api/product';
import { Account, Card, OrderDetail, OrderHistory, Product } from './components';
import { SIDETABS } from './const';
import styles from './index.module.scss';

const AdminPanel = () => {
    const navigate = useNavigate();
    const { tab } = useParams();
    const [list, setList] = useState([]);

    const handleGetList = async () => {
        let list = [];
        switch (tab) {
            case 'account':
                list = await getallaccount();
                break;

            case 'card':
                list = await getallcard();
                break;

            case 'product':
                list = await getallproduct();
                break;

            case 'orderdetail':
                list = await getallorderdetail();
                break;

            case 'orderhistory':
                list = await getallorderhistory();
                break;

            default:
                break;
        }

        setList(list);
    }

    const redirectToSidetab = (tab) => navigate(`/adminpanel/dashboard/${tab}`, { replace: true });

    useEffect(() => {
        handleGetList();
    }, [tab]);
    
    return (
        <div className={styles.container}>
            <div className={styles.sidetabs}>
                {SIDETABS.map(({ tabname, params }, index) => (
                    <div key={index} onClick={() => redirectToSidetab(params)}>{tabname}</div>
                ))}
            </div>
            <div className={styles.panel}>
                {
                    tab === 'account' ? <Account list={list} /> :
                        tab === 'card' ? <Card list={list} /> :
                            tab === 'product' ? <Product list={list} /> :
                                tab === 'orderdetail' ? <OrderDetail list={list} /> :
                                    tab === 'orderhistory' ? <OrderHistory list={list} /> :
                                        undefined
                }
            </div>
        </div>
    );
}

export default AdminPanel;