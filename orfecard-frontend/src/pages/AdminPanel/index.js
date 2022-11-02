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
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const handleGetList = async () => {
        let list = [];
        switch (tab) {
            case 'account':
                list = await getallaccount(limit, page);
                break;

            case 'card':
                list = await getallcard(limit, page);
                break;

            case 'product':
                list = await getallproduct(limit, page);
                break;

            case 'orderdetail':
                list = await getallorderdetail(limit, page);
                break;

            case 'orderhistory':
                list = await getallorderhistory(limit, page);
                break;

            default:
                break;
        }

        setList(list);
    }

    const redirectToSidetab = (tab) => navigate(`/adminpanel/dashboard/${tab}`, { replace: true });

    useEffect(() => {
        setLimit(10);
        setPage(1);
        handleGetList();
    }, [tab]);

    useEffect(() => {
        handleGetList();
    }, [limit, page]);

    return (
        <div className={styles.container}>
            <div className={styles.sidetabs}>
                {SIDETABS.map(({ tabname, params }, index) => (
                    <div key={index} className={styles.tab} onClick={() => redirectToSidetab(params)}>{tabname}</div>
                ))}
            </div>
            <div className={styles.panel}>
                {
                    tab === 'account' ?
                        <Account
                            list={list}
                            limit={limit}
                            setLimit={setLimit}
                            page={page}
                            setPage={setPage}
                        /> :
                        tab === 'card' ?
                            <Card
                                list={list}
                                limit={limit}
                                setLimit={setLimit}
                                page={page}
                                setPage={setPage}
                            /> :
                            tab === 'product' ?
                                <Product
                                    list={list}
                                    limit={limit}
                                    setLimit={setLimit}
                                    page={page}
                                    setPage={setPage}
                                /> :
                                tab === 'orderdetail' ?
                                    <OrderDetail
                                        list={list}
                                        limit={limit}
                                        setLimit={setLimit}
                                        page={page}
                                        setPage={setPage}
                                    /> :
                                    tab === 'orderhistory' &&
                                    <OrderHistory
                                        list={list}
                                        limit={limit}
                                        setLimit={setLimit}
                                        page={page}
                                        setPage={setPage}
                                    />
                }
            </div>
        </div>
    );
}

export default AdminPanel;