import React from 'react';
import { Slider, PrimaryFeatures } from '../../components';

const Homepage = () => {
    return (
        <div>
            <Slider count={4} />
            <PrimaryFeatures />
        </div>
    );
}

export default Homepage;