import React from 'react';
import Wrapper from './style';

const ActionButton = ({ children, ...rest }) => {
    return (
        <Wrapper>
            <span {...rest} />
            { children && (
                <span>{children}</span>
            ) }
        </Wrapper>
    );
}

export default ActionButton;
