import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getcarddetail } from '../../api/account';
import { E_COMMERCE_FIELDS, SOCIAL_MEDIA_FIELDS } from './const';
import styles from './index.module.scss';

const CardModal = ({ serialNumber, onClose }) => {
    const [detail, setDetail] = useState({});
    const { mode } = useSelector(state => state.view);

    const handleGetDetail = async () => {
        const data = await getcarddetail({ serialNumber });
        setDetail(data);
    }

    useEffect(() => {
        serialNumber && handleGetDetail();
    }, [serialNumber]);

    return (
        <div className={styles.container}>
            {!!serialNumber &&
                <div className={mode === 'DESKTOP' ? styles.desktopModal : styles.mobileModal}>
                    <div className={styles.closeContainer} onClick={onClose}>
                        <img
                            src='/icons/close_cross_icon.png'
                            alt='modal_close_icon'
                            className={styles.close}
                        />
                    </div>
                    <div className={styles.imageContainer}>
                        <img
                            src={detail?.image}
                            alt='detail_image'
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.companyName}>{detail?.companyName}</div>
                    <div className={styles.fullname}>{detail?.name + ' ' + detail?.lastname}</div>
                    <div className={styles.rowContainer}>
                        <div className={styles.row}>{detail?.address}</div>
                    </div>
                    <div className={styles.rowContainer}>
                        <div className={styles.row}>{detail?.website}</div>
                    </div>
                    <div className={styles.rowContainer}>
                        <div className={styles.row}>{detail?.phoneNumber}</div>
                    </div>
                    <div className={styles.rowContainer}>
                        <div className={styles.row}>{detail?.landlineNumber + ' - ' + detail?.extNumber}</div>
                    </div>
                    <div className={styles.rowContainer}>
                        <div className={styles.row}>{detail?.email}</div>
                    </div>
                    <div>
                        <div className={styles.iconContainer}>
                            {Object.keys(SOCIAL_MEDIA_FIELDS).map(el => (
                                <>
                                    {detail[el] &&
                                        <a href={detail[el]} target='_blank' rel="noreferrer">
                                            <img className={mode === 'DESKTOP' ? styles.desktopIcon : styles.mobileIcon} src={`/icons/card_info_icons/${SOCIAL_MEDIA_FIELDS[el]}`} alt='icons' />
                                        </a>
                                    }
                                </>
                            ))}
                        </div>
                        <div className={styles.iconContainer}>
                            {Object.keys(E_COMMERCE_FIELDS).map(el => (
                                <>
                                    {detail[el] &&
                                        <a href={detail[el]} target='_blank' rel="noreferrer">
                                            <img className={mode === 'DESKTOP' ? styles.desktopIcon : styles.mobileIcon} src={`/icons/card_info_icons/${E_COMMERCE_FIELDS[el]}`} alt='icons' />
                                        </a>
                                    }
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default CardModal;