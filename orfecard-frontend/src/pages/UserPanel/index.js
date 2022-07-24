import React, { useEffect, useState } from "react";
import { getcardownerinfo } from "../../api/account/";
import { UserCard, Modal, UpdateModal } from '../../components';
import styles from './index.module.scss';

const UserPanel = () => {
    const [cardOwnerInfos, setCardOwnerInfos] = useState([]);
    const [selectedCard, setSelectedCard] = useState(undefined);
    const [selectedEditCard, setSelectedEditCard] = useState(undefined);

    const handleClickCard = (email) => setSelectedCard(email);
    const handleClickClose = () => setSelectedCard(undefined);
    const handleClickEdit = (email) => setSelectedEditCard(email);
    const handleClickEditClose = () => setSelectedEditCard(undefined);

    const getCardUserInfo = async () => {
        const data = await getcardownerinfo();
        setCardOwnerInfos(data);
    }

    useEffect(() => {
        getCardUserInfo();
    }, [selectedEditCard]);

    return (
        <div>
            <Modal email={selectedCard} onClose={handleClickClose} />
            <UpdateModal email={selectedEditCard} onClose={handleClickEditClose} />
            <div className={styles.container}>
                <div className={styles.greeting}>Merhabalar {localStorage.getItem('email')},</div>
                <div className={styles.line} />
                {cardOwnerInfos.map(el => <UserCard onClickCard={handleClickCard} onClickEdit={handleClickEdit} data={el} />)}
            </div>
        </div>
    );
}

export default UserPanel;