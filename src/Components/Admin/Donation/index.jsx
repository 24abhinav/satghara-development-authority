import React, { useEffect, useState } from 'react';
import Wrapper from './style';
import { DonationTable } from '../../Donation';
import Modal from '../../ui/Modal';
import ADMIN_STATIC from '../constant';
import { addNewDonationHandler, deleteDonationHandler, updateDonationHandler } from '../handlers';
import Toast from '../../ui/Toast';

const AddUpdateDonation = ({ modal = {}, setModal, initialForm = {}, reload, setToast }) => {
    const [error, setError] = useState({});
    const [form, setForm] = useState({ name: '', amount: '', ...initialForm });
    const [loading, setLoading] = useState(false);

    const { type: operationType = '' } = modal;

    const onChange = e => {
        setForm({ ...form, [e.target.name] : e.target.value});
        setError({ ...error, [e.target.name] : null, apiError: null });
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

    const showError = () => {
        setError({ apiError: 'Some error occurred at server '});
    };

    const addNewDonation = async () => {
        const { ok } = await addNewDonationHandler(form);
        if (ok) {
            setToast({ msg: 'New Donation has been added'});
            reload();
        } else {
            showError();
            setLoading(false);
        }
    };

    const updateDonationExec = async () => {
        const { ok } = await updateDonationHandler(form);
        if (ok) {
            setToast({ msg: 'Donation updated'});
            reload();
        } else {
            showError();
            setLoading(false);
        }
    };

    const onSubmit = () => {
        const isValid = isFormValid();
        if (isValid) {
            setLoading(true);
            if (operationType === 'new') {
                addNewDonation();
            } else if (operationType === 'update') {
                updateDonationExec();
            }
        }
    };

    return (
        <div className="add-donation">
            <Modal loading={loading} onClose={() => setModal({})} onProceed={onSubmit}>
                <form>
                    {ADMIN_STATIC.addDonation.form.map(({ label, name, errorMsg, type, required }) => (
                        <div key={name} className="form-field">
                            <label>{label} {required && <span className='asterisk'>*</span>}</label>
                            <input value={form[name] || ''} className={error[name] ? 'input-error' : ''} onChange={onChange} type={type} name={name} />
                            { error[name] && (<span className='error-msg'>{errorMsg}</span>)}
                        </div>
                    ))}
                </form>
            </Modal>
        </div>
    );
};

const ManageDonation = () => {
    const [modal, setModal] = useState({});
    const [toast, setToast] = useState();
    const [reload, setReload] = useState(false);

    const { formInitialValue = {} } = modal;

    const reloadTable = () => {
        setModal({});
        setReload(true);
    };

    const deleteDonation = async ({ id }) => {
        const confirm = window.confirm('Confirm Delete');
        if (confirm) {
            const { ok } = await deleteDonationHandler(id);
            if (ok) {
                setToast({ msg: 'Donation deleted '});
                reloadTable();
            } else {
                setToast({ msg: 'Server Error', type: 'error' });
            }
        }
    };

    const changeDonation = (props) => {
        if(props.type === 'update') {
            const { english = '{}', amount = 0, id } = props;
            const { name = '' } = JSON.parse(english);
            setModal({ open: true, type: 'update', formInitialValue: { name, amount, id }});
        } else {
            deleteDonation(props);
        }
    }

    return (
        <Wrapper>
            <h3>Manage Donation</h3>
            {toast && <Toast { ...toast } /> }
            {modal.open && <AddUpdateDonation setToast={setToast} reload={reloadTable} initialForm={formInitialValue} modal={modal} setModal={setModal} />}
            <div className="add-new m-b-20">
                <button onClick={() => setModal({ open: true, type: 'new' })}>
                    <span className='fa fa-add'></span>
                    <span>Add New</span>
                </button>
            </div>
            <DonationTable reload={reload} setReload={setReload} isAdmin changeDonation={changeDonation} />
        </Wrapper>
    );
}

export default ManageDonation;
