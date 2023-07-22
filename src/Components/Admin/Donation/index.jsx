import React, { useState } from 'react';
import Wrapper from './style';
import { DonationTable } from '../../Donation';
import Modal from '../../ui/Modal';
import ADMIN_STATIC from '../constant';

const AddDonation = ({ modal = {}, setModal }) => {
    const [error, setError] = useState({});
    const [form, setForm] = useState({ name: '', amount: ''});

    const onChange = e => {
        setForm({ ...form, [e.target.name] : e.target.value})
    }

    const isFormValid = () => {
        const newError = {};
        let isValid = true;
        
        for (const key in form) {
            if (Object.hasOwnProperty.call(form, key)) {
                const element = form[key];
                if (!element) {
                    newError[key] = true;
                    isValid = false;
                }
            }
        }
        setError(newError);
        return isValid;
    };

    const onSubmit = () => {
        const isValid = isFormValid();
        if (isValid) {
            console.log(form);
        }
    };

    return (
        <div className="add-donation">
             {modal.open ? (
                <Modal onClose={() => setModal({})} onProceed={onSubmit}>
                    <form>
                        {ADMIN_STATIC.addDonation.form.map(({ label, name, errorMsg, type, required }) => (
                            <div key={name} className="form-field">
                                <label>{label} {required && <span className='asterisk'>*</span>}</label>
                                <input className={error[name] ? 'input-error' : ''} onChange={onChange} type={type} name={name} />
                                { error[name] && (<span className='error-msg'>{errorMsg}</span>)}
                            </div>
                        ))}
                    </form>
                </Modal>
             ) : null}
        </div>
    );
};

const ManageDonation = () => {
    const [modal, setModal] = useState({});
    return (
        <Wrapper>
            <h3>Manage Donation</h3>
            <AddDonation modal={modal} setModal={setModal} />
            <div className="add-new m-b-20">
                <button onClick={() => setModal({ open: true })}>
                    <span className='fa fa-add'></span>
                    <span>Add New</span>
                </button>
            </div>
            <DonationTable isAdmin />
        </Wrapper>
    );
}

export default ManageDonation;
