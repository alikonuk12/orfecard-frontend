import React from 'react';
import { Slider, PrimaryFeatures, CardFeatures } from '../../components';

const Homepage = () => {
    return (
        <div>
            <Slider count={4} />
            <PrimaryFeatures />
            <img width='100%' src='images/social_utility.jpg' alt='social_utility' />
            <CardFeatures />
        </div>
    );
}

export default Homepage;