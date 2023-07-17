import React, { useEffect, useState } from 'react';
import Wrapper from './style';

const Alert = ({ alert, type, autoClose = null }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (autoClose) {
            setInterval(() => {
                setOpen(false);
            }, autoClose * 1000);
        }
    }, []);

    return (
        <>
        {
            open ? (
                <Wrapper className='m-b-10' type={type}>
                    <p>{alert}</p>
                </Wrapper>
            ) : null
        }
        </>
    );
}

export default Alert;
