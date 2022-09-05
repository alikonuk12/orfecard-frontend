import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';

const InfoModal = ({ content, onClose }) => {
    const { mode } = useSelector(state => state.view);

    return (
        <div className={styles.container}>
            {!!content &&
                <form className={mode === 'DESKTOP' ? styles.desktopModal : styles.mobileModal}>
                    <div className={styles.closeContainer} onClick={onClose}>
                        <img
                            src='/icons/close_cross_icon.png'
                            alt='modal_close_icon'
                            className={styles.close}
                        />
                    </div>
                    <div className={styles.content}>{content}</div>
                </form>
            }
        </div>
    );
}

export default InfoModal;