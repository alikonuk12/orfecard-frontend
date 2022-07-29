import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getcardownerinfodetail } from '../../api/account';
import { E_COMMERCE_FIELDS, FIELDS, SOCIAL_MEDIA_FIELDS } from './const';
import styles from './index.module.scss';

const CardInfoModal = ({ email, onClose }) => {
    const [detail, setDetail] = useState({});
    const { mode } = useSelector(state => state.view);

    const handleGetDetail = async () => {
        const data = await getcardownerinfodetail({ email });
        setDetail(data);
    }

    useEffect(() => {
        email && handleGetDetail();
    }, [email]);

    return (
        <div className={styles.container}>
            {!!email &&
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
                    <div>
                        {Object.keys(FIELDS).map(el => (
                            <>
                                {detail[el] &&
                                    (el === 'createdAt' ?
                                        <div>{FIELDS[el] + ' ' + moment(detail[el]).format('DD-MM-YYYY')}</div> :
                                        <div>{FIELDS[el] + ' ' + detail[el]}</div>
                                    )
                                }
                            </>
                        ))}
                        <div className={styles.iconContainer}>
                            {Object.keys(SOCIAL_MEDIA_FIELDS).map(el => (
                                <>
                                    {detail[el] &&
                                        <a href={detail[el]} target='_blank' rel="noreferrer">
                                            <img className={mode === 'DESKTOP' ? styles.desktopIcon : styles.mobileIcon} src={`icons/card_info_icons/${SOCIAL_MEDIA_FIELDS[el]}`} alt='icons' />
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
                                            <img className={mode === 'DESKTOP' ? styles.desktopIcon : styles.mobileIcon} src={`icons/card_info_icons/${E_COMMERCE_FIELDS[el]}`} alt='icons' />
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

export default CardInfoModal;