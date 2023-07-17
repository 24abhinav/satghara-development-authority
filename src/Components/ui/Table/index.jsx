import React from 'react';
import Wrapper from './style';

const Table = ({ children }) => {
    return (
        <Wrapper>
            { children }
        </Wrapper>
    );
}

export default Table;
