import React from 'react';
import Wrapper from './style';
import { getMetaDetails } from '../../handlers';

const Footer = () => {
    const { footer: { copyright = '' } = {} } = getMetaDetails();
    return (
        <Wrapper>
            <span className='copyright'> &copy; {new Date().getFullYear()} {' '} {copyright}</span>
        </Wrapper>
    );
}

export default Footer;
