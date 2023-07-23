import React, { useEffect, useRef, useState } from 'react';
import Wrapper from './style';
import ADMIN_STATIC from '../constant';
import { addAdminUserHandler, deleteOrgUserHandler, fetchOrgUserHandler, resetOrgUserPasswordHandler } from '../handlers';
import Alert from '../../ui/Alert';
import Table from '../../ui/Table';

const AddUser = () => {
    const [alert, setAlert] = useState(null);
    const formRef = useRef();

    const addUser = async e => {
        e.preventDefault();
        setAlert(null);
        const formData = {};
        const form  = new FormData(e.currentTarget);
        for (let [key, value] of form.entries()) {
            if (value) {
                formData[key] = value;
            }
        }
        const { ok } = await addAdminUserHandler(formData);
        if (ok) {
            setAlert({ type: 'success', alert: 'User has been added'});
            e.target.reset();
        } else {
            setAlert({ type: 'error', alert: 'Something went wrong..'});
        }
    };

    return (
        <Wrapper className='m-b-20'>
            <h3>Add Admin user</h3>
            {alert && <Alert { ...alert } />}
            <form ref={formRef} onSubmit={addUser}>
                {ADMIN_STATIC.adminUser.formField.map(({ label, required, type, name }) => (
                    <div key={name} className={`form-field`}>
                        <label>{label} {required && <span className='asterisk'>*</span>} </label>
                        <input name={name} type={type} required={required}  />
                    </div>
                ))}
                <button className='primary-btn' type='submit'>Add</button>
            </form>
        </Wrapper>
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
            resetOrgUserPasswordHandler(userEmail);
        } else if (type === 'delete') {
            const confirm = window.confirm('Confirm Delete');
            if (confirm) {
                const { ok } = await deleteOrgUserHandler(userEmail);
                if (ok) {
                    fetchOrgUser();
                } else {
                    serverError();
                }
            }
        } else if (type === 'update') {
            console.log(userDetails);
        }
    };

    const ActionButton = ({ user }) => (
        <div className='action-button'>
            <button onClick={() => actionHandler('delete', user)} title='Delete'><span className="fa fa-trash-o"></span></button>
            <button onClick={() => actionHandler('update', user)} title='Contacted'><span className="fa fa-pen"></span></button>
            <button onClick={() => actionHandler('reset-password', user)} title='Send reset password link'><span className="fa fa-eye"></span></button>
        </div>
    );

    return (
        <>
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
        </>
    )
};

const OrgUser = () => {
    const [alert, setAlert] = useState(null);
    const formRef = useRef();

    const addUser = async e => {
        e.preventDefault();
        setAlert(null);
        const formData = {};
        const form  = new FormData(e.currentTarget);
        for (let [key, value] of form.entries()) {
            if (value) {
                formData[key] = value;
            }
        }
        const { ok } = await addAdminUserHandler(formData);
        if (ok) {
            setAlert({ type: 'success', alert: 'User has been added'});
            e.target.reset();
        } else {
            setAlert({ type: 'error', alert: 'Something went wrong..'});
        }
    };

    return (
        <Wrapper className='m-b-20'>
            <OrgUserList isAdmin />
            <h3>Add Admin user</h3>
            {alert && <Alert { ...alert } />}
            <form ref={formRef} onSubmit={addUser}>
                {ADMIN_STATIC.adminUser.formField.map(({ label, required, type, name }) => (
                    <div key={name} className={`form-field`}>
                        <label>{label} {required && <span className='asterisk'>*</span>} </label>
                        <input name={name} type={type} required={required}  />
                    </div>
                ))}
                <button className='primary-btn' type='submit'>Add</button>
            </form>
        </Wrapper>
    );
}

export default OrgUser;
