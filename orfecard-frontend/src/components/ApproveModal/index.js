import React from 'react';
import { BUTTONS } from './const';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';

const ApproveModal = ({ content, onClose, handleSubmit }) => {
    const { mode } = useSelector(state => state.view);

    return (
        <div className={styles.container}>
            {!!content &&
                <form className={mode === 'DESKTOP' ? styles.desktopModal : styles.mobileModal} onSubmit={handleSubmit}>
                    <div className={styles.closeContainer} onClick={onClose}>
                        <img
                            src='/images/icons/close_cross_icon.png'
                            alt='modal_close_icon'
                            className={styles.close}
                        />
                    </div>
                    <div className={styles.content}>{content}</div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} type='submit'>
                            {BUTTONS.APPROVE}
                        </button>
                        <button className={styles.button} type='button' onClick={onClose}>
                            {BUTTONS.REJECT}
                        </button>
                    </div>
                </form>
            }
        </div>
    );
}

export default ApproveModal;