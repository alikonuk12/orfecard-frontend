import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Zoom from 'react-img-zoom';
import { ADD_TO_CART } from '../../store/reducers/cartReducer';
import { BUTTON_TEXTS, COLORS, INFORMATION_TEXT, TITLES, ZOOM_PROPERTY } from './const';
import getAllProduct from '../../api/product/getAll';
import { generateUniqueID } from '../../util';
import styles from './index.module.scss';

const Purchase = () => {
    const { mode } = useSelector(state => state.view);

    const designRef = useRef();
    const logoRef = useRef();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(undefined);
    const [fullname, setFullname] = useState('');
    const [direction, setDirection] = useState(true);
    const [color, setColor] = useState(undefined);
    const [logo, setLogo] = useState(undefined);
    const [specialDesign, setSpecialDesign] = useState(undefined);

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
        const pid = generateUniqueID();
        dispatch(ADD_TO_CART({ pid, product, fullname, color, direction, logo, specialDesign }));
    }

    useEffect(() => {
        handleGetAllProduct();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.informationContainer}>
                <div className={styles.information}>{INFORMATION_TEXT}</div>
            </div>
            <div className={mode === 'DESKTOP' ? styles.purchaseContainer : styles.mobilePurchaseContainer}>
                {direction === 'vertical' ?
                    <>
                        <Zoom
                            img='images/deneme.jpg'
                            zoomScale={ZOOM_PROPERTY.SCALE}
                            width={mode === 'DESKTOP' ? ZOOM_PROPERTY.WIDTH : ZOOM_PROPERTY.MOBILE_WIDTH}
                            height={mode === 'DESKTOP' ? ZOOM_PROPERTY.HEIGHT : ZOOM_PROPERTY.MOBILE_HEIGHT}
                        />
                    </> :
                    <Zoom
                        img='images/deneme2.jpg'
                        zoomScale={ZOOM_PROPERTY.SCALE}
                        width={mode === 'DESKTOP' ? ZOOM_PROPERTY.WIDTH : ZOOM_PROPERTY.MOBILE_WIDTH}
                        height={mode === 'DESKTOP' ? ZOOM_PROPERTY.HEIGHT : ZOOM_PROPERTY.MOBILE_HEIGHT}
                    />
                }
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
                            <img className={styles.image} src='images/deneme.jpg' alt='first' onClick={handleClickFirst} />
                            <img className={styles.image} src='images/deneme2.jpg' alt='second' onClick={handleClickSecond} />
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