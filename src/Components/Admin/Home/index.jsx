import React from 'react';
import Wrapper from './style';
import { Outlet } from 'react-router-dom';

const Program = () => {
    return (
        <Wrapper className="page-width">
            <div className="admin">
                <div>
                    <Outlet />
                </div>
            </div>
        </Wrapper>
    );
}

export default Program;
