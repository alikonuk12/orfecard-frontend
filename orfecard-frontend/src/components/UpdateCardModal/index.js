import React, { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getcarddetail, updatecarddetail } from '../../api/account';
import { BUTTON_TEXT, E_COMMERCE_FIELDS, FIELDS, SOCIAL_MEDIA_FIELDS, VALIDATION_TEXT } from './const';
import styles from './index.module.scss';
import Input from "../Input";

const UpdateCardModal = ({ serialNumber, onClose }) => {
    const [detail, setDetail] = useState({});
    const inputRef = useRef();
    const { mode } = useSelector(state => state.view);

    const handleSubmit = async () => {
        const isSuccess = await updatecarddetail({ ...formik.values, serialNumber });
        isSuccess && handleClose();
    }

    const formik = useFormik({
        initialValues: {
            name: detail?.name,
            lastname: detail?.lastname,
            phoneNumber: detail?.phoneNumber,
            landlineNumber: detail?.landlineNumber,
            extNumber: detail?.extNumber,
            email: detail?.email,
            website: detail?.website,
            address: detail?.address,
            location: detail?.location,
            companyName: detail?.companyName,
            image: detail?.image,
            facebook: detail?.facebook,
            twitter: detail?.twitter,
            instagram: detail?.instagram,
            linkedIn: detail?.linkedIn,
            youtube: detail?.youtube,
            sahibinden: detail?.sahibinden,
            shopier: detail?.shopier,
            yemeksepeti: detail?.yemeksepeti,
            trendyol: detail?.trendyol,
            trendyolYemek: detail?.trendyolYemek,
            amazon: detail?.amazon,
            n11: detail?.n11,
            cicekSepeti: detail?.cicekSepeti,
            getir: detail?.getir,
            etsTur: detail?.etsTur,
            hepsiburada: detail?.hepsiburada,
            letgo: detail?.letgo,
            pinterest: detail?.pinterest,
            grupanya: detail?.grupanya
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

    const handleGetDetail = async () => {
        const data = await getcarddetail({ serialNumber });
        delete data['createdAt'];
        setDetail(data);
    }

    useEffect(() => {
        serialNumber && handleGetDetail();
    }, [serialNumber]);

    return (
        <div className={styles.container}>
            {!!serialNumber &&
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

export default UpdateCardModal;