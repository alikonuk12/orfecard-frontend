import React, { useEffect, useState } from "react";
import { deletecarddetail, getcard } from "../../api/account/";
import { UserCard, CardModal, UpdateCardModal } from '../../components';
import styles from './index.module.scss';

const UserPanel = () => {
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(undefined);
    const [selectedEditCard, setSelectedEditCard] = useState(undefined);

    const handleClickCard = (serialNumber) => setSelectedCard(serialNumber);
    const handleClickClose = () => setSelectedCard(undefined);
    const handleClickEdit = (serialNumber) => setSelectedEditCard(serialNumber);
    const handleClickEditClose = () => setSelectedEditCard(undefined);

    const getCardUser = async () => {
        const data = await getcard();
        setCards(data);
    }

    const handleDeleteCard = async (serialNumber) => {
        const isSuccess = await deletecarddetail({ serialNumber });
        isSuccess && getCardUser();
    }

    useEffect(() => {
        getCardUser();
    }, [selectedEditCard]);

    return (
        <div>
            <CardModal serialNumber={selectedCard} onClose={handleClickClose} />
            <UpdateCardModal serialNumber={selectedEditCard} onClose={handleClickEditClose} />
            <div className={styles.container}>
                <div className={styles.greeting}>Merhaba {localStorage.getItem('email')},</div>
                <div className={styles.line} />
                <div className={styles.subContainer}>
                    {cards.map(el =>
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
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    );
}

export default UserPanel;