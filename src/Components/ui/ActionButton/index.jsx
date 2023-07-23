import React from 'react';
import Wrapper from './style';

const ActionButton = ({ children, onClick, ...rest }) => {
    return (
        <Wrapper onClick={onClick}>
            <span {...rest} />
            { children && (
                <span>{children}</span>
            ) }
        </Wrapper>
    );
}

export default ActionButton;
