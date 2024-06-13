import React, { useEffect, useRef, useState } from 'react';
import Wrapper from './style';
import { Link } from 'react-router-dom';
import Modal from '../../ui/Modal';
import Alert from '../../ui/Alert';
import { addNewProgramHandler, editProgramHandler, getPrograms } from '../handlers';
import ADMIN_STATIC from '../constant';

const programs = [
    {
        imageUrl: 'https://satghara-development-foundation-server.vercel.app/static/Assets/hospital.png',
        title: 'free Hospital every sunday',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        detailsPageUrl: 'hospital',
        id: 1
    },
    {
        imageUrl: 'https://satghara-development-foundation-server.vercel.app/static/Assets/hospital.png',
        title: 'free Hospital every monday',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        detailsPageUrl: 'hospital',
        upcoming: true,
        id: 2
    },
    {
        imageUrl: 'https://satghara-development-foundation-server.vercel.app/static/Assets/hospital.png',
        title: 'free Hospital every tuesday',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        detailsPageUrl: 'hospital',
        upcoming: true,
        id: 3
    },
    {
        imageUrl: 'https://satghara-development-foundation-server.vercel.app/static/Assets/hospital.png',
        title: 'free Hospital every wednesday',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        detailsPageUrl: 'hospital',
        id: 4
    }
];

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
    // const [programs, setPrograms] = useState([]);

    const fetchFreshData = async () => {
        setModal({});
        // const { data = [] } = await getPrograms();
        // setPrograms(data);
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

    useEffect(() => {
        fetchFreshData();
    }, []);

    return (
        <Wrapper>
            <div className='items d-flex j-space-between'>
                <h2>Programs</h2>
                <div className='action-btn'>
                    <button onClick={showProgramModal} className='btn primary-btn'>Add New</button>
                </div>
            </div>
            <div className='cards'>
                {programs.map((program = {}) => {
                    const { title, description, imageUrl, detailsPageUrl, upcoming } = program;

                    return (
                        <div key={title} className='card'>
                            {upcoming && <small>Upcoming</small>}
                            <img src={imageUrl} alt={title} />
                            <div className='details'>
                                <h4>{title}</h4>
                                <p>{description}</p>
                                <hr />
                                <div className='action-btn d-flex j-space-between'>
                                    {detailsPageUrl && <Link className='link' to={detailsPageUrl}>View</Link>}
                                    <button className='btn warning-btn' onClick={() => showProgramModal({ operation: 'Edit', selectedProgram: program })}>Edit</button>
                                    <button className='btn danger-btn'>Delete</button>
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