import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { ADD_TO_CART } from '../../store/reducers/cartReducer';
import { BUTTON_TEXTS, COLORS, INFORMATION_TEXT, TITLES } from './const';
import getAllProduct from '../../api/product/getallproduct';
import { generateUniqueID } from '../../util';
import styles from './index.module.scss';

const Purchase = () => {
    const { mode } = useSelector(state => state.view);

    const designRef = useRef();
    const logoRef = useRef();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(undefined);
    const [fullname, setFullname] = useState('');
    const [direction, setDirection] = useState('vertical');
    const [color, setColor] = useState('#000000');
    const [logo, setLogo] = useState(undefined);
    const [specialDesign, setSpecialDesign] = useState(undefined);

    const colorName = {
        "#000000": 'black',
        "#FFFFFF": 'white',
        "#FF00FF": 'magenta',
        "#00FF00": 'green',
        "#0000FF": 'blue',
        "#FF0000": 'red',
    }

    const handleChangeFullname = ({ target }) => setFullname(target.value);

    const handleGetAllProduct = async () => {
        const [response] = await getAllProduct();
        setProduct(response);
    }

    const handleClickFirst = () => setDirection('vertical');
    const handleClickSecond = () => setDirection('horizontal');
    const handleChangeColor = (color) => setColor(color);
    const handleClickLogo = () => logoRef.current.click();
    const handleClickDesign = () => designRef.current.click();

    const handleChangeLogo = ({ target }) => {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => setLogo(reader.result);
    }

    const handleChangeSpecialDesign = ({ target }) => {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => setSpecialDesign(reader.result);
    }

    const addToCart = () => {
        try {
            new Promise(resolve => {
                const pid = generateUniqueID();
                dispatch(ADD_TO_CART({ pid, product, fullname, color, direction, logo, specialDesign }));
                resolve();
            });
            NotificationManager.success('Sepete Eklendi', 'Başarılı');
        } catch (error) {
            NotificationManager.error('Bir şeyler ters gitti, lütfen tekrar deneyin', 'Hata!');
        }
    }

    useEffect(() => {
        handleGetAllProduct();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.informationContainer}>
                <div className={mode === 'DESKTOP' ? styles.information : styles.mobileInformation}>{INFORMATION_TEXT}</div>
            </div>
            <div className={mode === 'DESKTOP' ? styles.purchaseContainer : styles.mobilePurchaseContainer}>
                <figure className={styles.figure}>
                    {!!specialDesign ?
                        <img
                            className={styles.image}
                            src={specialDesign}
                            alt='special_design'
                        /> :
                        <>
                            <img
                                className={styles.image}
                                src={`images/card_images/${colorName[color]}_${direction}.svg`}
                                alt='card'
                            />
                            <figcaption>
                                <img className={styles[`${direction}_logo_figcaption`]} src={logo || 'images/logo.svg'} alt='logo' />
                            </figcaption>
                            <figcaption className={color === '#FFFFFF' ? styles[`white_${direction}_figcaption`] : styles[`${direction}_figcaption`]}>
                                {fullname}
                            </figcaption>
                        </>}
                </figure>
                <div className={styles.rightSide}>
                    <div className={styles.cardInfo}>
                        <div className={styles.productName}>
                            {product?.productName}
                        </div>
                        <div className={styles.price}>
                            ₺{product?.price}+KDV
                        </div>
                    </div>
                    <div className={styles.cardDetails}>
                        <div className={styles.title}>{TITLES.FULLNAME}</div>
                        <input className={styles.input} value={fullname} onChange={handleChangeFullname} />
                        <div className={styles.buttonContainer}>
                            <div onClick={handleClickLogo} className={styles.button}>
                                {BUTTON_TEXTS.LOGO}
                                <input className={styles.fileUpload} ref={logoRef} type='file' onChange={handleChangeLogo} />
                            </div>
                            <div onClick={handleClickDesign} className={styles.button}>
                                {BUTTON_TEXTS.DESIGN}
                                <input className={styles.fileUpload} ref={designRef} type='file' onChange={handleChangeSpecialDesign} />
                            </div>
                        </div>
                        <div className={styles.title}>{TITLES.COLOR}</div>
                        <div className={styles.colors}>
                            {Object.values(COLORS).map(el =>
                                <div
                                    onClick={() => handleChangeColor(el)}
                                    style={{ backgroundColor: el }}
                                    className={styles.color}
                                />
                            )}
                        </div>
                        <div className={styles.cardDirectionContainer}>
                            <div className={styles.title}>{TITLES.DIRECTION}</div>
                            <div onClick={handleClickSecond} className={styles.directionButton}>
                                {BUTTON_TEXTS.HORIZONTAL}
                            </div>
                            <div onClick={handleClickFirst} className={styles.directionButton}>
                                {BUTTON_TEXTS.VERTICAL}
                            </div>
                        </div>
                    </div>
                    <div onClick={addToCart} className={styles.addButtonContainer}>
                        <div className={styles.addButton}>{BUTTON_TEXTS.ADD}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Purchase;