import React, { useEffect, useState } from 'react';
import Wrapper from './style';
// import Manifest from '../../../manifest';
// import { getMetaDetails } from '../../../handlers';
// import { Link } from 'react-router-dom';

const Hospital = () => {
    // const { overviewPage = {} } = getMetaDetails() || {};
    
    const initialData = async () => {
    };

    useEffect(() => {
        initialData()
    }, []);

    return (
        <Wrapper>
            Hospital
        </Wrapper>
    );
}

export default Hospital;