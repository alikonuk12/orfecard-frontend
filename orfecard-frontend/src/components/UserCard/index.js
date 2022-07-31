import React from 'react';
import styles from './index.module.scss';

const UserCard = ({ data, onClickCard, onClickEdit, handleDeleteCard }) => {
    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <div className={styles.editContainer} onClick={() => onClickEdit(data?.serialNumber)}>
                    <img
                        src='/icons/edit_icon.svg'
                        alt='edit_icon'
                        className={styles.edit}
                    />
                </div>
                <div className={styles.editContainer} onClick={() => handleDeleteCard(data?.serialNumber)}>
                    <img
                        src='/icons/delete_icon.svg'
                        alt='edit_icon'
                        className={styles.edit}
                    />
                </div>
            </div>
            <div className={styles.bottomContainer} onClick={() => onClickCard(data?.serialNumber)}>
                {data?.image && <img className={styles.image} src={data.image} alt='card_image' />}
                <div className={styles.infos}>
                    <div className={styles.fullname}>{data?.name + ' ' + data?.lastname}</div>
                    <div className={styles.subContainer}>
                        <div className={styles.contact}>Kart Seri No: {data?.serialNumber}</div>
                        <div className={styles.contact}>{data?.email}</div>
                        <div className={styles.contact}>{data?.phoneNumber}</div>
                        {data?.companyName && <div className={styles.companyName}>{data.companyName}</div>}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default UserCard;