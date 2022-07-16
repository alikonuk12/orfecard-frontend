import React, { useEffect, useState } from "react";
import { getcardownerinfo, updatecardownerinfo } from "../../api/account/";
import { UserCard, Modal } from '../../components';
import styles from './index.module.scss';

const UserPanel = () => {
    const [cardOwnerInfos, setCardOwnerInfos] = useState([]);
    const [selectedCard, setSelectedCard] = useState(undefined);

    const handleClickCard = (email) => {
        setSelectedCard(email);
    }

    const handleClickClose = () => {
        setSelectedCard(undefined);
    }

    const getCardUserInfo = async () => {
        const data = await getcardownerinfo();
        setCardOwnerInfos(data);
    }

    useEffect(() => {
        getCardUserInfo();
    }, []);

    return (
        <div>
            <Modal email={selectedCard} onClose={handleClickClose} />
            <div className={styles.container}>
                <div className={styles.greeting}>Merhabalar {localStorage.getItem('email')},</div>
                <div className={styles.line} />
                {cardOwnerInfos.map(el => <UserCard onClick={handleClickCard} data={el} />)}
            </div>
        </div>
    );
}

export default UserPanel;