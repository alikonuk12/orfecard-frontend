import React, { useEffect, useState } from 'react';
import Zoom from 'react-img-zoom';
import { BUTTON_TEXTS, COLORS, INFORMATION_TEXT, TITLES, ZOOM_PROPERTY } from './const';
import getAllProduct from '../../api/product/getAll';
import styles from './index.module.scss';

const Purchase = () => {
    const [product, setProduct] = useState(undefined);
    const [fullname, setFullname] = useState('');
    const [image, setImage] = useState('images/deneme.jpg');

    const handleChangeFullname = ({ target }) => setFullname(target.value);

    const handleGetAllProduct = async () => {
        const [response] = await getAllProduct();
        setProduct(response);
    }

    const handleClickFirst = () => setImage('images/deneme.jpg');
    const handleClickSecond = () => setImage('images/deneme2.jpg');

    useEffect(() => {
        handleGetAllProduct();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.informationContainer}>
                <div className={styles.information}>{INFORMATION_TEXT}</div>
            </div>
            <div className={styles.purchaseContainer}>
                <Zoom
                    img={image}
                    zoomScale={ZOOM_PROPERTY.SCALE}
                    width={ZOOM_PROPERTY.WIDTH}
                    height={ZOOM_PROPERTY.HEIGHT}
                />
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
                            <div className={styles.button}>{BUTTON_TEXTS.LOGO}</div>
                            <div className={styles.button}>{BUTTON_TEXTS.DESIGN}</div>
                        </div>
                        <div className={styles.title}>{TITLES.COLOR}</div>
                        <div className={styles.colors}>
                            {Object.values(COLORS).map(el => <div style={{ backgroundColor: el }} className={styles.color} />)}
                        </div>
                        <div className={styles.cardDirectionContainer}>
                            <div className={styles.title}>{TITLES.DIRECTION}</div>
                            <img className={styles.image} src='images/deneme.jpg' alt='first' onClick={handleClickFirst} />
                            <img className={styles.image} src='images/deneme2.jpg' alt='second' onClick={handleClickSecond} />
                        </div>
                    </div>
                    <div className={styles.addButtonContainer}>
                    <div className={styles.addButton}>{BUTTON_TEXTS.ADD}</div>
                    </div>
                </div>
            </div>
            <div className={styles.detailContainer}>

            </div>
        </div>
    );
}

export default Purchase;