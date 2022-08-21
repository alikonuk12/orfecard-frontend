import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Slider, PrimaryFeatures, CardFeatures } from '../../components';
import { TAKE_OFFSET } from '../../store/reducers/viewReducer';

const Homepage = () => {
    const socialUtilityRef = useRef(null);
    const featuresRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(document.readyState === 'complete')
            dispatch(TAKE_OFFSET({ socialUtilityOffset: socialUtilityRef.current.offsetTop - 94, featuresOffset: featuresRef.current.offsetTop - 94 }));
    }, []);

    return (
        <div>
            <Slider count={2} />
            <PrimaryFeatures />
            <img ref={socialUtilityRef} width='100%' src='images/social_utility.jpg' alt='social_utility' />
            <div ref={featuresRef}><CardFeatures /></div>
        </div>
    );
}

export default Homepage;