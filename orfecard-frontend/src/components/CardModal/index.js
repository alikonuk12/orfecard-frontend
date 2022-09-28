import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getcarddetail } from '../../api/account';
import { InfoModal } from '../';
import { E_COMMERCE_FIELDS, FIELDS, SOCIAL_MEDIA_FIELDS } from './const';
import styles from './index.module.scss';

const CardModal = ({ serialNumber, onClose }) => {
    const [detail, setDetail] = useState({});
    const [info, setInfo] = useState('');

    const { mode } = useSelector(state => state.view);

    const handleGetDetail = async () => {
        const data = await getcarddetail({ serialNumber });
        setDetail(data);
    }

    const handleClickInfoModal = (info) => setInfo(info);
    const handleCloseInfoModal = () => setInfo('');

    useEffect(() => {
        serialNumber && handleGetDetail();
    }, [serialNumber]);

    return (
        <>
            <InfoModal content={info} onClose={handleCloseInfoModal} />
            <div className={styles.container}>
                {!!serialNumber &&
                    <div className={mode === 'DESKTOP' ? styles.desktopModal : styles.mobileModal}>
                        <div className={styles.closeContainer} onClick={onClose}>
                            <img
                                src='/images/icons/close_cross_icon.png'
                                alt='modal_close_icon'
                                className={styles.close}
                            />
                        </div>
                        <div className={styles.imageContainer}>
                            <img
                                src={detail?.image || '/images/icons/person_icon.svg'}
                                alt='detail_image'
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.companyName}>{detail?.companyName}</div>
                        <div className={styles.fullname}>{detail?.name + ' ' + detail?.lastname}</div>
                        <div className={styles.rowContainer}>
                            <div className={styles.row}>
                                <img className={styles.icon} src='/images/icons/profile_icons/location.svg' alt='location' />
                                <div className={styles.text}>{detail?.address}</div>
                            </div>
                        </div>
                        <div className={styles.rowContainer}>
                            <div className={styles.row}>
                                <img className={styles.icon} src='/images/icons/profile_icons/website.svg' alt='website' />
                                <div className={styles.text}>{detail?.website}</div>
                            </div>
                        </div>
                        <div className={styles.rowContainer}>
                            <div className={styles.row}>
                                <img className={styles.icon} src='/images/icons/profile_icons/phone_number.svg' alt='phone_number' />
                                <div className={styles.text}>{detail?.phoneNumber}</div>
                            </div>
                        </div>
                        <div className={styles.rowContainer}>
                            <div className={styles.row}>
                                <img className={styles.icon} src='/images/icons/profile_icons/landline_number.svg' alt='landline_number' />
                                <div className={styles.text}>{(detail?.landlineNumber && detail?.extNumber) && detail?.landlineNumber + ' - ' + detail?.extNumber}</div>
                            </div>
                        </div>
                        <div className={styles.rowContainer}>
                            <div className={styles.row}>
                                <img className={styles.icon} src='/images/icons/profile_icons/email.svg' alt='email' />
                                <div className={styles.text}>{detail?.email}</div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.iconContainer}>
                                {Object.keys(FIELDS).map(el => (
                                    <>
                                        {
                                            (el === 'tax_information' || el === 'bank_information') ?
                                                detail[el] && <div onClick={() => handleClickInfoModal(detail[el])}>
                                                    <img className={mode === 'DESKTOP' ? styles.desktopIcon : styles.mobileIcon} src={`/images/icons/card_info_icons/${FIELDS[el]}`} alt='icons' />
                                                </div> :
                                                detail[el] && <a href={detail[el]} target='_blank' rel="noreferrer">
                                                    <img className={mode === 'DESKTOP' ? styles.desktopIcon : styles.mobileIcon} src={`/images/icons/card_info_icons/${FIELDS[el]}`} alt='icons' />
                                                </a>
                                        }
                                    </>
                                ))}
                            </div>
                            <div className={styles.iconContainer}>
                                {Object.keys(SOCIAL_MEDIA_FIELDS).map(el => (
                                    <>
                                        {detail[el] &&
                                            <a href={detail[el]} target='_blank' rel="noreferrer">
                                                <img className={mode === 'DESKTOP' ? styles.desktopIcon : styles.mobileIcon} src={`/images/icons/card_info_icons/${SOCIAL_MEDIA_FIELDS[el]}`} alt='icons' />
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
                                                <img className={mode === 'DESKTOP' ? styles.desktopIcon : styles.mobileIcon} src={`/images/icons/card_info_icons/${E_COMMERCE_FIELDS[el]}`} alt='icons' />
                                            </a>
                                        }
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default CardModal;