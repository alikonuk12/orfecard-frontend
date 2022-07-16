import React from 'react';
import styles from './index.module.scss';

const UserCard = ({ data, onClick }) => {
    return (
        <div className={styles.container} onClick={() => onClick(data?.email)}>
            {data?.image && <img className={styles.image} src={data.image} alt='card_image' />}
            <div className={styles.infos}>
                <div className={styles.fullname}>{data?.name + ' ' + data?.lastname}</div>
                <div className={styles.subContainer}>
                    <div className={styles.contact}>{data?.email}</div>
                    <div className={styles.contact}>{data?.phoneNumber}</div>
                    {data?.companyName && <div className={styles.companyName}>{data.companyName}</div>}
                </div>
            </div>
        </div>
    );
}

export default UserCard;