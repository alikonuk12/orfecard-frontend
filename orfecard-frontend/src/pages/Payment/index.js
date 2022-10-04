import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import axios from 'axios';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Base64 } from "js-base64";
import { Input } from '../../components';
import styles from './index.module.scss';
import {
    PAYMENT_PANEL_HEADER,
    NAME_VALIDATION_TEXT,
    SURNAME_VALIDATION_TEXT,
    CITY_VALIDATION_TEXT,
    COUNTRY_VALIDATION_TEXT,
    BILLING_ADDRESS_VALIDATION_TEXT,
    TAX_NUMBER_VALIDATION_TEXT,
    ZIPCODE_VALIDATION_TEXT,
    ADDRESS_VALIDATION_TEXT,
    SHIPPING_ZIPCODE_VALIDATION_TEXT,
    CARDHOLDER_NAME_VALIDATION_TEXT,
    CARD_NUMBER_VALIDATION_TEXT,
    EXPIRE_MONTH_VALIDATION_TEXT,
    EXPIRE_YEAR_VALIDATION_TEXT,
    CVC_VALIDATION_TEXT,
    PAYMENT_INPUTS
} from './const';
import { giveorder } from '../../api/account';
import { convertToCreditCardFormat } from '../../util';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { mode } = useSelector(state => state.view);

    const [ip, setIP] = useState('');
    const [cart, setCart] = useState('');
    const [total, setTotal] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cardNumber = formik.values.cardNumber.replace(/\s+/g, '');
        const htmlContent = await giveorder({ cart, total, infos: { ...formik.values, cardNumber, ip } });
        const html = Base64.atob(htmlContent);
        let iframe = document.createElement("iframe");
        iframe.srcdoc = html;
        iframe.id = "iframe";
        iframe.style.position = "absolute";
        iframe.style.top = "150px";
        iframe.style.left = "30%";
        iframe.style.zIndex = "999";
        iframe.style.height = "420px";
        iframe.style.width = "520px";
        iframe.style.backgroundColor = "white";
        iframe.style.border = "none";
        document.body.prepend(iframe);
        document.body.style.overflow = "hidden";
    }

    const getData = async () => {
        if (!location.state) navigate('/satin-al', { replace: true });

        const { cart, total } = location.state;
        setCart(cart);
        setTotal(total);

        const res = await axios.get('https://geolocation-db.com/json/');
        setIP(res.data.IPv4)
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            ip: ip,
            city: '',
            country: '',
            billingAddress: '',
            taxAdministration: '',
            taxNumber: '',
            zipCode: '',
            address: '',
            shippingZipCode: '',
            cardHolderName: '',
            cardNumber: '',
            expireMonth: '',
            expireYear: '',
            cvc: ''
        },
        onSubmit: () => handleSubmit,
        validationSchema: yup.object({
            name: yup
                .string()
                .required(NAME_VALIDATION_TEXT.REQUIRED),
            surname: yup
                .string()
                .required(SURNAME_VALIDATION_TEXT.REQUIRED),
            city: yup
                .string()
                .required(CITY_VALIDATION_TEXT.REQUIRED),
            country: yup
                .string()
                .required(COUNTRY_VALIDATION_TEXT.REQUIRED),
            billingAddress: yup
                .string()
                .required(BILLING_ADDRESS_VALIDATION_TEXT.REQUIRED),
            taxAdministration: yup.string(),
            taxNumber: yup
                .string()
                .required(TAX_NUMBER_VALIDATION_TEXT.REQUIRED)
                .min(10, TAX_NUMBER_VALIDATION_TEXT.MIN),
            zipCode: yup
                .string()
                .required(ZIPCODE_VALIDATION_TEXT.REQUIRED),
            address: yup
                .string()
                .required(ADDRESS_VALIDATION_TEXT.REQUIRED),
            shippingZipCode: yup
                .string()
                .required(SHIPPING_ZIPCODE_VALIDATION_TEXT.REQUIRED),
            cardHolderName: yup
                .string()
                .required(CARDHOLDER_NAME_VALIDATION_TEXT.REQUIRED),
            cardNumber: yup
                .string()
                .required(CARD_NUMBER_VALIDATION_TEXT.REQUIRED),
            expireMonth: yup
                .string()
                .required(EXPIRE_MONTH_VALIDATION_TEXT.REQUIRED),
            expireYear: yup
                .string()
                .required(EXPIRE_YEAR_VALIDATION_TEXT.REQUIRED),
            cvc: yup
                .string()
                .required(CVC_VALIDATION_TEXT.REQUIRED),
        })
    });

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={mode === 'DESKTOP' ? styles.container : styles.mobileContainer}>
            <div className={styles.leftSide}>
                <div className={styles.paymentHeader}>{PAYMENT_PANEL_HEADER}</div>
                <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        title={PAYMENT_INPUTS.NAME}
                        value={formik.values.name}
                        isError={formik.touched.name && formik.errors.name}
                        errorText={formik.errors.name}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="surname"
                        name="surname"
                        type="text"
                        title={PAYMENT_INPUTS.SURNAME}
                        value={formik.values.surname}
                        isError={formik.touched.surname && formik.errors.surname}
                        errorText={formik.errors.surname}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="city"
                        name="city"
                        type="text"
                        title={PAYMENT_INPUTS.CITY}
                        value={formik.values.city}
                        isError={formik.touched.city && formik.errors.city}
                        errorText={formik.errors.city}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="country"
                        name="country"
                        type="text"
                        title={PAYMENT_INPUTS.COUNTRY}
                        value={formik.values.country}
                        isError={formik.touched.country && formik.errors.country}
                        errorText={formik.errors.country}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="billingAddress"
                        name="billingAddress"
                        type="text"
                        rows={3}
                        title={PAYMENT_INPUTS.BILLING_ADDRESS}
                        value={formik.values.billingAddress}
                        isError={formik.touched.billingAddress && formik.errors.billingAddress}
                        errorText={formik.errors.billingAddress}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="taxAdministration"
                        name="taxAdministration"
                        type="text"
                        title={PAYMENT_INPUTS.TAX_ADMINISTRATION}
                        value={formik.values.taxAdministration}
                        isError={formik.touched.taxAdministration && formik.errors.taxAdministration}
                        errorText={formik.errors.taxAdministration}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="taxNumber"
                        name="taxNumber"
                        type="text"
                        title={PAYMENT_INPUTS.TAX_NUMBER}
                        value={formik.values.taxNumber}
                        isError={formik.touched.taxNumber && formik.errors.taxNumber}
                        errorText={formik.errors.taxNumber}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        title={PAYMENT_INPUTS.ZIPCODE}
                        value={formik.values.zipCode}
                        isError={formik.touched.zipCode && formik.errors.zipCode}
                        errorText={formik.errors.zipCode}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="address"
                        name="address"
                        type="text"
                        rows={3}
                        title={PAYMENT_INPUTS.ADDRESS}
                        value={formik.values.address}
                        isError={formik.touched.address && formik.errors.address}
                        errorText={formik.errors.address}
                        onChange={formik.handleChange}
                    />
                    <Input
                        id="shippingZipCode"
                        name="shippingZipCode"
                        type="text"
                        title={PAYMENT_INPUTS.SHIPPING_ZIPCODE}
                        value={formik.values.shippingZipCode}
                        isError={formik.touched.shippingZipCode && formik.errors.shippingZipCode}
                        errorText={formik.errors.shippingZipCode}
                        onChange={formik.handleChange}
                    />
                </form>
            </div>
            <div className={styles.rightSide}>
                <Cards
                    cvc={formik.values.cvc}
                    expiry={formik.values.expireMonth + '/' + formik.values.expireYear}
                    focused={true}
                    name={formik.values.cardHolderName}
                    number={formik.values.cardNumber}
                />
                <div>
                    <div className={styles.inputHeader}>{PAYMENT_INPUTS.CARDHOLDER_NAME}</div>
                    <input
                        id="cardHolderName"
                        name="cardHolderName"
                        type="text"
                        className={styles.input}
                        value={formik.values.cardHolderName}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.cardHolderName && formik.errors.cardHolderName &&
                        <div className={styles.inputError}>{formik.errors.cardHolderName}</div>
                    }
                </div>
                <div>
                    <div className={styles.inputHeader}>{PAYMENT_INPUTS.CARD_NUMBER}</div>
                    <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        className={styles.input}
                        value={formik.values.cardNumber}
                        onChange={(e) => {
                            const result = convertToCreditCardFormat(e.target.value);
                            formik.setFieldValue('cardNumber', result);
                        }}
                    />
                    {formik.touched.cardNumber && formik.errors.cardNumber &&
                        <div className={styles.inputError}>{formik.errors.cardNumber}</div>
                    }
                </div>
                <div className={styles.expireDate}>
                    <div>
                        <div className={styles.inputHeader}>{PAYMENT_INPUTS.EXPIRE_MONTH}</div>
                        <input
                            id="expireMonth"
                            name="expireMonth"
                            type="text"
                            maxLength={2}
                            style={{ width: '30px' }}
                            className={styles.input}
                            value={formik.values.expireMonth}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.expireMonth && formik.errors.expireMonth &&
                            <div className={styles.inputError}>{formik.errors.expireMonth}</div>
                        }
                    </div>
                    <div>
                        <div className={styles.inputHeader}>{PAYMENT_INPUTS.EXPIRE_YEAR}</div>
                        <input
                            id="expireYear"
                            name="expireYear"
                            type="text"
                            maxLength={2}
                            style={{ width: '30px' }}
                            className={styles.input}
                            value={formik.values.expireYear}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.expireYear && formik.errors.expireYear &&
                            <div className={styles.inputError}>{formik.errors.expireYear}</div>
                        }
                    </div>
                    <div>
                        <div className={styles.inputHeader}>{PAYMENT_INPUTS.CVC}</div>
                        <input
                            id="cvc"
                            name="cvc"
                            type="text"
                            maxLength={3}
                            style={{ width: '30px' }}
                            className={styles.input}
                            value={formik.values.cvc}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.cvc && formik.errors.cvc &&
                            <div className={styles.inputError}>{formik.errors.cvc}</div>
                        }
                    </div>
                </div>
                <button onClick={handleSubmit} className={styles.buttonContainer}>
                    <div className={styles.button}>
                        <img
                            src='/images/icons/payment_button.svg'
                            alt='payment_icon'
                        />
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Payment;