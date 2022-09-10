import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components';
import {
    SETTINGS_PANEL_HEADER,
    SETTINGS_INPUTS,
    EMAIL_VALIDATION_TEXT,
    PHONE_NUMBER_VALIDATION_TEXT,
    ADDRESS_VALIDATION_TEXT,
    TAX_ADMINISTRATION_VALIDATION_TEXT,
    PASSWORD_VALIDATION_TEXT,
    SETTINGS_BUTTON_TEXT,
} from './const';
import styles from './index.module.scss';
import { getuser, updateuser } from '../../api/account';

const Settings = () => {
    const navigate = useNavigate();

    const handleGetUser = async () => {
        const user = await getuser();
        Object.keys(user).map(field => formik.setFieldValue(field, user[field]));
    }

    const handleSubmit = async () => {
        const isSuccess = await updateuser(formik.values);
        isSuccess && navigate('/userpanel', { replace: true });
    }

    useEffect(() => {
        handleGetUser();
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
            phoneNumber: '',
            website: '',
            address: '',
            taxAdministration: '',
            taxNumber: '',
            TCKN: '',
            companyTitle: '',
            landlineNumber: '',
            extNumber: ''
        },
        onSubmit: handleSubmit,
        validationSchema: yup.object({
            email: yup
                .string()
                .email(EMAIL_VALIDATION_TEXT.EMAIL)
                .required(EMAIL_VALIDATION_TEXT.REQUIRED),
            phoneNumber: yup
                .string()
                .required(PHONE_NUMBER_VALIDATION_TEXT.REQUIRED)
                .length(11, PHONE_NUMBER_VALIDATION_TEXT.LENGTH),
            website: yup.string(),
            address: yup
                .string()
                .required(ADDRESS_VALIDATION_TEXT.REQUIRED),
            taxAdministration: yup
                .string()
                .required(TAX_ADMINISTRATION_VALIDATION_TEXT.REQUIRED),
            taxNumber: yup.string(),
            TCKN: yup.string(),
            companyTitle: yup.string(),
            landlineNumber: yup.string(),
            extNumber: yup.string()
        })
    });

    return (
        <div className={styles.container}>
            <div className={styles.settingsContainer}>
                <div className={styles.settingsHeader}>{SETTINGS_PANEL_HEADER}</div>
                <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                    <Input
                        id="companyTitle"
                        name="companyTitle"
                        type="text"
                        title={SETTINGS_INPUTS.COMPANY_TITLE}
                        value={formik.values.companyTitle}
                        isError={formik.touched.companyTitle && formik.errors.companyTitle}
                        errorText={formik.errors.companyTitle}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        title={SETTINGS_INPUTS.EMAIL}
                        value={formik.values.email}
                        isError={formik.touched.email && formik.errors.email}
                        errorText={formik.errors.email}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        title={SETTINGS_INPUTS.PHONE_NUMBER}
                        value={formik.values.phoneNumber}
                        isError={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        errorText={formik.errors.phoneNumber}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="address"
                        name="address"
                        type="text"
                        title={SETTINGS_INPUTS.ADDRESS}
                        value={formik.values.address}
                        isError={formik.touched.address && formik.errors.address}
                        errorText={formik.errors.address}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="taxAdministration"
                        name="taxAdministration"
                        type="text"
                        title={SETTINGS_INPUTS.TAX_ADMINISTRATION}
                        value={formik.values.taxAdministration}
                        isError={formik.touched.taxAdministration && formik.errors.taxAdministration}
                        errorText={formik.errors.taxAdministration}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="taxNumber"
                        name="taxNumber"
                        type="text"
                        title={SETTINGS_INPUTS.TAX_NUMBER}
                        value={formik.values.taxNumber}
                        isError={formik.touched.taxNumber && formik.errors.taxNumber}
                        errorText={formik.errors.taxNumber}
                        onChange={formik.handleChange}
                    />
                    <button type='submit' className={styles.button}>{SETTINGS_BUTTON_TEXT}</button>
                </form>
            </div>
        </div>
    );
}

export default Settings;