import React from 'react';
import Wrapper from './style';

const ActionButton = ({ children, className }) => {
    return (
        <Wrapper>
            <span className={className} />
            { children && (
                <span>{children}</span>
            ) }
        </Wrapper>
    );
}

export default ActionButton;
