import React, { useRef, useState } from 'react';
import Wrapper from './style';
import ADMIN_STATIC from '../constant';
import { addAdminUserHandler } from '../handlers';
import Alert from '../../ui/Alert';

const AddAdminUser = () => {
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

export default AddAdminUser;
