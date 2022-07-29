import React, { useEffect, useState } from "react";
import { deletecardownerinfodetail, getcardownerinfo } from "../../api/account/";
import { UserCard, CardInfoModal, CreateCardInfoModal, UpdateCardInfoModal } from '../../components';
import styles from './index.module.scss';

const UserPanel = () => {
    const [cardOwnerInfos, setCardOwnerInfos] = useState([]);
    const [selectedCard, setSelectedCard] = useState(undefined);
    const [selectedEditCard, setSelectedEditCard] = useState(undefined);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleClickCard = (email) => setSelectedCard(email);
    const handleClickClose = () => setSelectedCard(undefined);
    const handleClickEdit = (email) => setSelectedEditCard(email);
    const handleClickEditClose = () => setSelectedEditCard(undefined);
    const handleClickCreate = () => setIsCreateModalOpen(true);
    const handleClickCreateClose = () => setIsCreateModalOpen(false);

    const getCardUserInfo = async () => {
        const data = await getcardownerinfo();
        setCardOwnerInfos(data);
    }

    const handleDeleteCard = async (email) => {
        const isSuccess = await deletecardownerinfodetail({ email });
        isSuccess && getCardUserInfo();
    }

    useEffect(() => {
        getCardUserInfo();
    }, [selectedEditCard, isCreateModalOpen]);

    return (
        <div>
            <CardInfoModal email={selectedCard} onClose={handleClickClose} />
            <CreateCardInfoModal isOpen={isCreateModalOpen} onClose={handleClickCreateClose} />
            <UpdateCardInfoModal email={selectedEditCard} onClose={handleClickEditClose} />
            <div className={styles.container}>
                <div className={styles.greeting}>Merhaba {localStorage.getItem('email')},</div>
                <div className={styles.line} />
                <div className={styles.subContainer}>
                    {cardOwnerInfos.map(el =>
                        <UserCard
                            onClickCard={handleClickCard}
                            onClickEdit={handleClickEdit}
                            handleDeleteCard={handleDeleteCard}
                            data={el}
                        />
                    )}
                    <img
                        className={styles.add}
                        src='/icons/add_icon.svg'
                        alt='add'
                        onClick={handleClickCreate}
                    />
                </div>
            </div>
        </div>
    );
}

export default UserPanel;