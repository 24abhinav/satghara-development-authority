import React, { useEffect, useState } from 'react';
import Wrapper from './style';

const Alert = ({ alert, type, autoClose = 15, onClose }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setOpen(false);
            if (typeof onClose === 'function') {
                onClose();
            }
        }, autoClose * 1000);
    }, []);

    return (
        <>
        {
            open ? (
                <Wrapper className='m-b-10' type={type}>
                    <p>{alert}</p>
                    <i className='fa fa-close'></i>
                </Wrapper>
            ) : null
        }
        </>
    );
}

export default Alert;
