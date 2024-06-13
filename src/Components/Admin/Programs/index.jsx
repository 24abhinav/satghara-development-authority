import React, { useEffect, useRef, useState } from 'react';
import Wrapper from './style';
import { Link } from 'react-router-dom';
import Modal from '../../ui/Modal';
import Alert from '../../ui/Alert';
import { addNewProgramHandler, deleteProgramHandler, editProgramHandler, getPrograms } from '../handlers';
import ADMIN_STATIC from '../constant';
import Toast from '../../ui/Toast';
import Manifest from '../../../manifest';

const AddEditProgram = ({ onClose, selectedProgram = {}, operation, onSuccess }) => {
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const btnRef = useRef();

    const addEditProgram = async e => {
        e.preventDefault();
        setAlert(null);
        setLoading(true);
        const formData = {};
        const form  = new FormData(e.currentTarget);
        for (let [key, value] of form.entries()) {
            if (value) {
                formData[key] = value;
            }
        }
        let handlerToExecute = operation === 'Add' ? addNewProgramHandler : editProgramHandler;
        const { ok } = await handlerToExecute(formData, selectedProgram);
        if (ok) {
            onSuccess();
        } else {
            let msg = 'Something went wrong';
            setLoading(false);
            setAlert({ type: 'error', alert: msg });
        }
    };

    return (
        <Modal loading={loading} className='m-b-20' onClose={onClose} onProceed={() => btnRef.current.click()}>
            <h3>{operation} Programs</h3>
            {alert && <Alert { ...alert } />}
            <form onSubmit={addEditProgram}>
                {ADMIN_STATIC.programs.formField.map(({ label, required, type, name }) => (
                    <div key={name} className={`form-field`}>
                        <label>{label} {required && <span className='asterisk'>*</span>} </label>
                        <input defaultValue={selectedProgram[name] || ''} name={name} type={type} required={required}  />
                    </div>
                ))}
                <button ref={btnRef} className='primary-btn btn' type='submit' style={{display: 'none'}} />
            </form>
        </Modal>
    )
};

const Programs = () => {
    const [modal, setModal] = useState({});
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState();

    const fetchFreshData = async () => {
        setModal({});
        setLoading(true);
        const { data = [] } = await getPrograms();
        setPrograms(data);
        setLoading(false);
    };

    const showProgramModal = ({ operation = 'Add', selectedProgram = {} }) => {
        setModal({
            open: true,
            operation,
            onSuccess: fetchFreshData,
            onClose: () => setModal({}),
            selectedProgram
        });
    }

    const onDelete = async (program) => {
        setLoading(true);
        const { ok } = await deleteProgramHandler(program);
        let msg = 'Program moved to bin, it will be deleted after 30 days from database'
        if (ok) {
            fetchFreshData();
        } else {
            msg = 'Something went wrong';
            setLoading(false);
        }
        setToast({ msg });
    }

    useEffect(() => {
        fetchFreshData();
    }, []);

    return (
        <Wrapper>
            {toast && <Toast { ...toast } onClose={() =>  setToast()} /> }
            <div className='items d-flex j-space-between'>
                <h2>Programs ({programs.length})</h2>
                <div className='action-btn'>
                    <button disabled={loading} onClick={showProgramModal} className='btn primary-btn'>Add New</button>
                </div>
            </div>
            <div className='cards'>
                {programs.map((program = {}) => {
                    const { title, description, imageurl, detailspageurl, alerts } = program;

                    return (
                        <div key={title} className='card'>
                            {alerts && <small>{alerts}</small>}
                            <img src={`${Manifest.apiBashUrl}/static/${imageurl}`} alt={title} />
                            <div className='details'>
                                <h4>{title}</h4>
                                <p>{description}</p>
                                <hr />
                                <div className='action-btn d-flex j-space-between'>
                                    {detailspageurl && <Link className='link' to={detailspageurl}>View</Link>}
                                    <button disabled={loading} className='btn warning-btn' onClick={() => showProgramModal({ operation: 'Edit', selectedProgram: program })}>Edit</button>
                                    <button disabled={loading} className='btn danger-btn' onClick={() => onDelete(program)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {modal.open && <AddEditProgram {...modal} />}
        </Wrapper>
    );
}

export default Programs;