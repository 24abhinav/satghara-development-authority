import React, { useState } from 'react';
import Wrapper from './style';
import { getMetaDetails } from '../../handlers';
import Alert from '../ui/Alert';

const { contactUs } = getMetaDetails();

const ContactUs = () => {
    const [form, setForm] = useState({});
    const [error, setError] = useState({});
    const [alert, setAlert] = useState(null);

    const validate = () => {
        let hasError = true;
        const errorMsg = {};
        Object.keys(contactUs.formFields).forEach(key => {
            const {[key]: formValue = '' } = form;
            const {[key]: { required = false, errMsg = '' } = {} } = contactUs.formFields;
            if (required && (!formValue || (key === 'mobile' && formValue.length !== 10))) {
                errorMsg[key] = errMsg;
                hasError = false;
            }
        });
        setError(errorMsg);
        return hasError;
    };

    const onSubmit = () => {
        const hasFormValid = validate();
        if (hasFormValid) {
            console.log(form);
            setAlert({
                type: "success",
                alert: contactUs.successAlert
            })
        }
    };

    const onChangeHandler = (key, value) => {
        const {[key]: _, ...restError } = error;
        setForm({ ...form, [key]: value });
        setError({ ...restError });
    };

    return (
        <Wrapper onSubmit={e => {
            e.preventDefault();
            onSubmit();
        }}>
            {alert && <Alert { ...alert } />}
            <h3 dangerouslySetInnerHTML={{__html: contactUs.heading}} />
            <div className="m-b-15">
                {Object.keys(contactUs.formFields).map(key =>  {
                    const { label, placeholder, required, type } = contactUs.formFields[key];
                    return (
                        <div key={key} className="form-field">
                            <label htmlFor={key}>
                                {label} {required && (<span className='asterisk'> * </span>)}
                            </label>
                            <input className={error[key] ? 'input-error' : ''} onChange={(e) => onChangeHandler(key, e.target.value)} name={key} type={type} placeholder={placeholder} />
                            {error[key] && <span className='error-msg'>{error[key]}</span>}
                        </div>
                    )
                })}
            </div>
            <button type='submit'>{contactUs.submit}</button>
        </Wrapper>
    );
}

export default ContactUs;
