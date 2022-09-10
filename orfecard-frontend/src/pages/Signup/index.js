import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Input } from '../../components';
import styles from './index.module.scss';
import { signup } from "../../api/account";
import {
    SIGNUP_PANEL_HEADER,
    SIGNUP_INPUTS,
    EMAIL_VALIDATION_TEXT,
    COMPANY_TITLE_VALIDATION_TEXT,
    PHONE_NUMBER_VALIDATION_TEXT,
    ADDRESS_VALIDATION_TEXT,
    PASSWORD_VALIDATION_TEXT,
    SIGNUP_BUTTON_TEXT,
    TCKN_VALIDATION_TEXT,
} from './const';

const Signup = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async () => {
        const { status, data } = await signup(formik.values);
        if (status === 'success') {
            localStorage.setItem('email', data.email);
            localStorage.setItem('role', data.role);
            if (data.role === 'Client') navigate("/userpanel", { replace: true });
            else if (data.role === 'Admin') navigate("/adminpanel", { replace: true });
            else navigate("/", { replace: true });
        } else {
            setErrorMessage(data)
        }
        return status;
    };

    const handleSubmit = async () => {
        const status = await handleSignup();
        status === 'success' && window.location.reload();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            phoneNumber: '',
            address: '',
            taxAdministration: '',
            taxNumber: '',
            TCKN: '',
            companyTitle: '',
            landlineNumber: '',
            extNumber: '',
            password: '',
            password_again: ''
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
            password: yup
                .string()
                .required(PASSWORD_VALIDATION_TEXT.REQUIRED)
                .min(8, PASSWORD_VALIDATION_TEXT.MIN)
                .max(20, PASSWORD_VALIDATION_TEXT.MAX),
            password_again: yup
                .string()
                .required(PASSWORD_VALIDATION_TEXT.REQUIRED)
                .min(8, PASSWORD_VALIDATION_TEXT.MIN)
                .max(20, PASSWORD_VALIDATION_TEXT.MAX)
                .oneOf([yup.ref('password'), null], PASSWORD_VALIDATION_TEXT.MATCH)
        })
    });

    return (
        <div className={styles.container}>
            <div className={styles.signupContainer}>
                <div className={styles.signupHeader}>{SIGNUP_PANEL_HEADER}</div>
                <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                    <Input
                        id="companyTitle"
                        name="companyTitle"
                        type="text"
                        title={SIGNUP_INPUTS.COMPANY_TITLE}
                        value={formik.values.companyTitle}
                        isError={formik.touched.companyTitle && formik.errors.companyTitle}
                        errorText={formik.errors.companyTitle}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        title={SIGNUP_INPUTS.EMAIL}
                        value={formik.values.email}
                        isError={formik.touched.email && formik.errors.email}
                        errorText={formik.errors.email}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        title={SIGNUP_INPUTS.PHONE_NUMBER}
                        value={formik.values.phoneNumber}
                        isError={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        errorText={formik.errors.phoneNumber}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="address"
                        name="address"
                        type="text"
                        title={SIGNUP_INPUTS.ADDRESS}
                        value={formik.values.address}
                        isError={formik.touched.address && formik.errors.address}
                        errorText={formik.errors.address}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="taxAdministration"
                        name="taxAdministration"
                        type="text"
                        title={SIGNUP_INPUTS.TAX_ADMINISTRATION}
                        value={formik.values.taxAdministration}
                        isError={formik.touched.taxAdministration && formik.errors.taxAdministration}
                        errorText={formik.errors.taxAdministration}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="taxNumber"
                        name="taxNumber"
                        type="text"
                        title={SIGNUP_INPUTS.TAX_NUMBER}
                        value={formik.values.taxNumber}
                        isError={formik.touched.taxNumber && formik.errors.taxNumber}
                        errorText={formik.errors.taxNumber}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="TCKN"
                        name="TCKN"
                        type="number"
                        title={SIGNUP_INPUTS.TCKN}
                        value={formik.values.TCKN}
                        isError={formik.touched.TCKN && formik.errors.TCKN}
                        errorText={formik.errors.TCKN}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        title={SIGNUP_INPUTS.PASSWORD}
                        value={formik.values.password}
                        isError={formik.touched.password && formik.errors.password}
                        errorText={formik.errors.password}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="password_again"
                        name="password_again"
                        type="password"
                        title={SIGNUP_INPUTS.PASSWORD_AGAIN}
                        value={formik.values.password_again}
                        isError={formik.touched.password_again && formik.errors.password_again}
                        errorText={formik.errors.password_again}
                        onChange={formik.handleChange}
                    />
                    <div className={styles.errorMessage}>{errorMessage}</div>
                    <button type='submit' className={styles.button}>{SIGNUP_BUTTON_TEXT}</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;