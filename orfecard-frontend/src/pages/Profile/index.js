import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getprofile, addtocontact } from '../../api/account';
import { E_COMMERCE_FIELDS, SOCIAL_MEDIA_FIELDS } from './const';
import styles from './index.module.scss';

const Profile = () => {
    const { profileId } = useParams();
    const { mode } = useSelector(state => state.view);
    const [profile, setProfile] = useState(undefined);

    const handleGetProfile = async () => {
        const data = await getprofile(profileId);
        setProfile(data);
    }

    const handleAddToContact = async () => {
        const response = await addtocontact(profileId);
    }

    useEffect(() => {
        handleGetProfile();
    }, [profileId])

    return (
        <div className={styles.container}>
            {!!profile &&
                <div className={mode === 'DESKTOP' ? styles.desktopModal : styles.mobileModal}>
                    <div className={styles.imageContainer}>
                        <img
                            src={profile?.image}
                            alt='profile_image'
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.companyName}>{profile?.companyName}</div>
                    <div className={styles.fullname}>{profile?.name + ' ' + profile?.lastname}</div>
                    <div className={styles.rowContainer}>
                        <div className={styles.row}>
                            <img className={styles.icon} src='/icons/profile_icons/location.svg' alt='location' />
                            <div className={styles.text}>{profile?.address}</div>
                        </div>
                    </div>
                    <div className={styles.rowContainer}>
                        <div className={styles.row}>
                            <img className={styles.icon} src='/icons/profile_icons/website.svg' alt='website' />
                            <div className={styles.text}>{profile?.website}</div>
                        </div>
                    </div>
                    <div className={styles.rowContainer}>
                        <div className={styles.row}>
                            <img className={styles.icon} src='/icons/profile_icons/phone_number.svg' alt='phone_number' />
                            <div className={styles.text}>{profile?.phoneNumber}</div>
                        </div>
                    </div>
                    <div className={styles.rowContainer}>
                        <div className={styles.row}>
                            <img className={styles.icon} src='/icons/profile_icons/landline_number.svg' alt='landline_number' />
                            <div className={styles.text}>{profile?.landlineNumber + ' - ' + profile?.extNumber}</div>
                        </div>
                    </div>
                    <div className={styles.rowContainer}>
                        <div className={styles.row}>
                            <img className={styles.icon} src='/icons/profile_icons/email.svg' alt='email' />
                            <div className={styles.text}>{profile?.email}</div>
                        </div>
                    </div>
                    <div onClick={handleAddToContact} className={styles.addToContactContainer}>
                        <div className={styles.addToContact}>REHBERE EKLE</div>
                    </div>
                    <div>
                        <div className={styles.iconContainer}>
                            {Object.keys(SOCIAL_MEDIA_FIELDS).map(el => (
                                <>
                                    {profile[el] &&
                                        <a href={profile[el]} target='_blank' rel="noreferrer">
                                            <img className={mode === 'DESKTOP' ? styles.desktopIcon : styles.mobileIcon} src={`/icons/card_info_icons/${SOCIAL_MEDIA_FIELDS[el]}`} alt='icons' />
                                        </a>
                                    }
                                </>
                            ))}
                        </div>
                        <div className={styles.iconContainer}>
                            {Object.keys(E_COMMERCE_FIELDS).map(el => (
                                <>
                                    {profile[el] &&
                                        <a href={profile[el]} target='_blank' rel="noreferrer">
                                            <img className={mode === 'DESKTOP' ? styles.desktopIcon : styles.mobileIcon} src={`/icons/card_info_icons/${E_COMMERCE_FIELDS[el]}`} alt='icons' />
                                        </a>
                                    }
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Profile;