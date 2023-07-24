import React, { useEffect, useState } from 'react';
import Wrapper from './style';

const Toast = ({ msg = 'toast message', type, autoClose = 5 }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (autoClose) {
            setInterval(() => {
                setOpen(false);
            }, autoClose * 1000);
        }
    }, []);

    useEffect(() => {
        if (!open) {
            setOpen(true);
        }
    }, [msg]);

    return (
        <>
        {
            open ? (
                <Wrapper className='m-b-10' type={type}>
                    <p>{msg}</p>
                </Wrapper>
            ) : null
        }
        </>
    );
}

export default Toast;
