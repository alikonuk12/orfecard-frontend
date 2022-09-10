import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components';
import {
    SETTINGS_PANEL_HEADER,
    SETTINGS_INPUTS,
    PHONE_NUMBER_VALIDATION_TEXT,
    ADDRESS_VALIDATION_TEXT,
    SETTINGS_BUTTON_TEXT,
    TCKN_VALIDATION_TEXT,
    COMPANY_TITLE_VALIDATION_TEXT
} from './const';
import styles from './index.module.scss';
import { getuser, updateuser } from '../../api/account';

const Settings = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleGetUser = async () => {
        const user = await getuser();
        Object.keys(user).map(field => formik.setFieldValue(field, user[field]));
    }

    const handleSubmit = async () => {
        const { status, data } = await updateuser(formik.values);
        if (status === 'success') return navigate('/userpanel', { replace: true });
        setErrorMessage(data);
    }

    useEffect(() => {
        handleGetUser();
    }, []);

    const formik = useFormik({
        initialValues: {
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
            phoneNumber: yup
                .string()
                .required(PHONE_NUMBER_VALIDATION_TEXT.REQUIRED)
                .length(11, PHONE_NUMBER_VALIDATION_TEXT.LENGTH),
            website: yup.string(),
            address: yup
                .string()
                .required(ADDRESS_VALIDATION_TEXT.REQUIRED),
            taxAdministration: yup.string(),
            taxNumber: yup.string(),
            TCKN: yup
                .string()
                .nullable()
                .length(11, TCKN_VALIDATION_TEXT.LENGTH),
            companyTitle: yup
                .string()
                .required(COMPANY_TITLE_VALIDATION_TEXT.REQUIRED),
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
                        id="website"
                        name="website"
                        type="text"
                        title={SETTINGS_INPUTS.WEBSITE}
                        value={formik.values.website}
                        isError={formik.touched.website && formik.errors.website}
                        errorText={formik.errors.website}
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
                    <Input
                        id="TCKN"
                        name="TCKN"
                        type="number"
                        title={SETTINGS_INPUTS.TCKN}
                        value={formik.values.TCKN}
                        isError={formik.touched.TCKN && formik.errors.TCKN}
                        errorText={formik.errors.TCKN}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="landlineNumber"
                        name="landlineNumber"
                        type="text"
                        title={SETTINGS_INPUTS.LANDLINE_NUMBER}
                        value={formik.values.landlineNumber}
                        isError={formik.touched.landlineNumber && formik.errors.landlineNumber}
                        errorText={formik.errors.landlineNumber}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="extNumber"
                        name="extNumber"
                        type="text"
                        title={SETTINGS_INPUTS.EXT_NUMBER}
                        value={formik.values.extNumber}
                        isError={formik.touched.extNumber && formik.errors.extNumber}
                        errorText={formik.errors.extNumber}
                        onChange={formik.handleChange}
                    />
                    <div className={styles.errorMessage}>{errorMessage}</div>
                    <button type='submit' className={styles.button}>{SETTINGS_BUTTON_TEXT}</button>
                </form>
            </div>
        </div>
    );
}

export default Settings;