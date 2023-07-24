import React, { useEffect, useRef, useState } from 'react';
import Wrapper from './style';
import ADMIN_STATIC from '../constant';
import { addAdminUserHandler, deleteOrgUserHandler, fetchOrgUserHandler, resetOrgUserPasswordHandler, updateAdminUserHandler } from '../handlers';
import Alert from '../../ui/Alert';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import Toast from '../../ui/Toast';

const AddEditUser = ({ onClose, userDetails = {}, operation, onSuccess }) => {
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const btnRef = useRef();

    const addUser = async e => {
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
        let handlerToExecute = operation === 'Add' ? addAdminUserHandler : updateAdminUserHandler;
        const { ok, status } = await handlerToExecute(formData, userDetails);
        if (ok) {
            onSuccess(operation);
        } else {
            let msg = 'Something went wrong';
            if (status === 409) {
                msg = 'Entered email is already exist';
            }
            setLoading(false);
            setAlert({ type: 'error', alert: msg });
        }
    };

    return (
        <Modal loading={loading} className='m-b-20' onClose={onClose} onProceed={() => btnRef.current.click()}>
            <h3>{operation} Admin user</h3>
            {alert && <Alert { ...alert } />}
            <form onSubmit={addUser}>
                {ADMIN_STATIC.adminUser.formField.map(({ label, required, type, name }) => (
                    <div key={name} className={`form-field`}>
                        <label>{label} {required && <span className='asterisk'>*</span>} </label>
                        <input defaultValue={userDetails[name] || ''} name={name} type={type} required={required}  />
                    </div>
                ))}
                <button ref={btnRef} className='primary-btn' type='submit' style={{display: 'none'}} />
            </form>
        </Modal>
    );
}

const MobileList = ({ list = [], isAdmin, ActionButton }) => {
    return (
        <div className="mobile-list">
            {list?.map((user) => { 
                const { id, name, mobile, email, designation } = user;
                return (
                <ul key={id}>
                    <li>
                        <span>Name:</span>
                        <span>{name}</span>
                    </li>
                    <li>
                        <span>Mobile:</span>
                        <span>{mobile}</span>
                    </li>
                    <li>
                        <span>Email:</span>
                        <span>{email}</span>
                    </li>
                    <li>
                        <span>Designation:</span>
                        <span>{designation}</span>
                    </li>
                    {isAdmin && (
                        <li className='action-btn'>
                            <span>Action</span>
                            <div>
                                <ActionButton user={user} />
                            </div>
                        </li>
                    )}
                </ul>
            )})}
        </div>
    )
};


const OrgUserList = ({ isAdmin }) => {
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState({});
    const [toast, setToast] = useState();

    const fetchOrgUser = async () => {
        const { ok, data } = await fetchOrgUserHandler();
        if (ok) {
            setUsers(data);
        }
    };

    useEffect(() => {
        fetchOrgUser();
    }, []);

    const serverError = () => {
        alert('Server Error');
    };

    const actionHandler = async (type, userDetails) => {
        const { email: userEmail = '' } = userDetails;
        if (type === 'reset-password') {
            await resetOrgUserPasswordHandler(userEmail);
            setToast({ msg: 'Resent password link has been sent to the email'});
        } else if (type === 'delete') {
            const confirm = window.confirm('Confirm Delete');
            if (confirm) {
                const { ok } = await deleteOrgUserHandler(userEmail);
                if (ok) {
                    fetchOrgUser();
                    setToast({ msg: 'User deleted successfully '});
                } else {
                    serverError();
                }
            }
        } else if (type === 'update') {
            setModal({ open: true, userDetails, operation: 'Update' });
        }
    };

    const ActionButton = ({ user }) => (
        <div className='action-button'>
            <button onClick={() => actionHandler('delete', user)} title='Delete'>
                <span className="fa fa-trash-o"></span>
            </button>
            <button onClick={() => actionHandler('update', user)} title='Contacted'>
                <span className="fa fa-pen"></span>
            </button>
            <button onClick={() => actionHandler('reset-password', user)} title='Send reset password link'>
                <span className="fa fa-eye"></span>
            </button>
        </div>
    );

    const reloadData = (operation) => {
        const toastMsg = {
            Add: 'User added successfully',
            Update: 'User updated successfully'
        };
        fetchOrgUser();
        setToast({ msg: toastMsg[operation]});
        setModal({});
    }

    return (
        <>
             {toast && <Toast { ...toast } /> }
            <button className='primary-btn m-b-20' onClick={() => setModal({ open: true, operation: 'Add'})}>Add New User</button>
            <div className='data-table'>
                <Table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>mobile</td>
                            <td>Designation</td>
                            {isAdmin && <>
                                <td>Role</td>
                                <td>Action</td>
                            </>}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const { name, email, mobile, designation, role } = user;
                            return (
                            <tr key={email}>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{mobile}</td>
                                <td>{designation}</td>
                                {isAdmin && <>
                                    <td>{role}</td>
                                    <td><ActionButton user={user} /></td>
                                </>}
                            </tr>
                        )})}
                    </tbody>
                </Table>
            </div>
            <MobileList ActionButton={ActionButton} list={users} isAdmin={isAdmin} />
            {modal.open && <AddEditUser { ...modal } onSuccess={reloadData} onClose={() => setModal({})} />}
        </>
    )
};

const OrgUser = () => {
    return (
        <Wrapper className='m-b-20'>
            <OrgUserList isAdmin />
        </Wrapper>
    );
}

export default OrgUser;
