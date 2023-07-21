import React, { useEffect } from 'react';
import Wrapper from './style';

const Modal = ({ children, onClose, onProceed }) => {

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
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onProceed}>Submit</button>
                </div>
            </div>
        </Wrapper>
    );
}

export default Modal;
