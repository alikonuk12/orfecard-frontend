import React, { useRef } from "react";
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createcardownerinfodetail } from '../../api/account';
import { BUTTON_TEXT, E_COMMERCE_FIELDS, FIELDS, SOCIAL_MEDIA_FIELDS, VALIDATION_TEXT } from './const';
import styles from './index.module.scss';
import Input from "../Input";

const CreateCardInfoModal = ({ isOpen, onClose }) => {
    const inputRef = useRef();
    const { mode } = useSelector(state => state.view);

    const handleSubmit = async () => {
        const isSuccess = await createcardownerinfodetail(formik.values);
        isSuccess && handleClose();
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            phoneNumber: '',
            landlineNumber: '',
            extNumber: '',
            email: '',
            website: '',
            address: '',
            location: '',
            companyName: '',
            image: '',
            facebook: '',
            twitter: '',
            instagram: '',
            linkedIn: '',
            youtube: '',
            sahibinden: '',
            shopier: '',
            yemeksepeti: '',
            trendyol: '',
            trendyolYemek: '',
            amazon: '',
            n11: '',
            cicekSepeti: '',
            getir: '',
            etsTur: '',
            hepsiburada: '',
            letgo: '',
            pinterest: '',
            grupanya: ''
        },
        enableReinitialize: true,
        onSubmit: handleSubmit,
        validationSchema: yup.object({
            name: yup
                .string()
                .required(VALIDATION_TEXT.REQUIRED),
            lastname: yup
                .string()
                .required(VALIDATION_TEXT.REQUIRED),
            phoneNumber: yup
                .string()
                .required(VALIDATION_TEXT.REQUIRED)
                .length(11, VALIDATION_TEXT.LENGTH)
                .test('Check Prefix', (value, { createError, path }) => {
                    if (!value.startsWith('05')) {
                        return createError({ path, message: VALIDATION_TEXT.PHONE_NUMBER });
                    }
                    return true;
                }),
            email: yup
                .string()
                .email(VALIDATION_TEXT.EMAIL)
                .required(VALIDATION_TEXT.REQUIRED)
        })
    });

    const handleClose = () => {
        formik.resetForm();
        onClose();
    }
    const handleClickImage = () => inputRef.current.click();
    const handleChangeImage = ({ target }) => {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            formik.setFieldValue('image', reader.result);
        }
        reader.readAsDataURL(file);
    }

    return (
        <div className={styles.container}>
            {!!isOpen &&
                <form
                    className={mode === 'DESKTOP' ? styles.desktopModal : styles.mobileModal}
                    onSubmit={formik.handleSubmit}
                >
                    <div className={styles.closeContainer} onClick={handleClose}>
                        <img
                            src='/icons/close_cross_icon.png'
                            alt='modal_close_icon'
                            className={styles.close}
                        />
                    </div>
                    <div className={styles.imageContainer}>
                        <div onClick={handleClickImage} style={{
                            backgroundImage: `url(${formik.values.image})`,
                            backgroundSize: '150px',
                            width: '150px',
                            height: '150px',
                            cursor: 'pointer'
                        }}>
                            <img src="/icons/add_icon.svg" alt='add_icon' />
                            <input ref={inputRef} hidden type='file' onChange={handleChangeImage} />
                        </div>
                    </div>
                    <div className={styles.rowContainer}>
                        {Object.keys(FIELDS).map(el => (
                            <div className={styles.row}>
                                <div className={mode !== 'DESKTOP' && styles.rowKey}>{FIELDS[el]}</div>
                                <Input
                                    id={el}
                                    name={el}
                                    value={formik.values[el]}
                                    isError={formik.touched[el] && formik.errors[el]}
                                    errorText={formik.errors[el]}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        ))}
                        {Object.keys(SOCIAL_MEDIA_FIELDS).map(el => (
                            <div className={styles.row}>
                                <div className={mode !== 'DESKTOP' && styles.rowKey}>{el}</div>
                                <Input
                                    id={el}
                                    name={el}
                                    value={formik.values[el]}
                                    isError={formik.touched[el] && formik.errors[el]}
                                    errorText={formik.errors[el]}
                                    onChange={formik.handleChange}
                                   
                                />
                            </div>
                        ))}
                        {Object.keys(E_COMMERCE_FIELDS).map(el => (
                            <div className={styles.row}>
                                <div className={mode !== 'DESKTOP' && styles.rowKey}>{el}</div>
                                <Input
                                    id={el}
                                    name={el}
                                    value={formik.values[el]}
                                    isError={formik.touched[el] && formik.errors[el]}
                                    errorText={formik.errors[el]}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} type='submit'>
                            {BUTTON_TEXT}
                        </button>
                    </div>
                </form>
            }
        </div>
    );
}

export default CreateCardInfoModal;