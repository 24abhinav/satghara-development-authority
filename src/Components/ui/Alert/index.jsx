import React from 'react';
import Wrapper from './style';

const Alert = ({ alert, type }) => {
    return (
        <Wrapper className='m-b-10' type={type}>
            <p>{alert}</p>
        </Wrapper>
    );
}

export default Alert;
