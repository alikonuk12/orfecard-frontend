import React, { useState } from 'react';
import ApproveModal from '../ApproveModal';
import { CONTENT } from './const';
import styles from './index.module.scss';

const UserCard = ({ data, onClickCard, onClickEdit, handleDeleteCard }) => {
    const [content, setContent] = useState('');

    const handleClickDelete = () => setContent(CONTENT);
    const handleClickClose = () => setContent('');
    
    const handleClickApprove = (e) => {
        e.preventDefault();
        handleDeleteCard(data?.serialNumber);
    }

    return (
        <div className={styles.container}>
            <ApproveModal handleSubmit={handleClickApprove} content={content} onClose={handleClickClose} />
            <div className={styles.iconContainer}>
                <div className={styles.editContainer} onClick={() => onClickEdit(data?.serialNumber)}>
                    <img
                        src='/icons/edit_icon.svg'
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
            <div className={styles.iconContainer}>
                <div className={styles.deleteContainer} onClick={handleClickDelete}>
                    <img
                        src='/icons/delete_icon.svg'
                        alt='delete_icon'
                        className={styles.delete}
                    />
                </div>
            </div>
        </div>

    );
}

export default UserCard;