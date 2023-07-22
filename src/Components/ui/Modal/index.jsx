import React, { useEffect } from 'react';
import Wrapper from './style';

const Modal = ({ children, onClose, onProceed, loading }) => {

    console.log({ onClose, onProceed })
    useEffect(() => {
        window.document.body.style.height = '100vh';
        window.document.body.style.overflow = 'hidden';

        return () => {
            window.document.body.style.height = 'auto';
            window.document.body.style.overflow = 'auto';
        }
    }, []);

    return (
        <Wrapper>
            <div className="modal">
                {children}
                <div className="modal-btn">
                    <button disabled={loading} onClick={onClose}>Cancel</button>
                    <button disabled={loading} onClick={onProceed}>Submit</button>
                </div>
            </div>
        </Wrapper>
    );
}

export default Modal;
