import React, { useState } from 'react';
import Wrapper from './style';
import { getMetaDetails, postContact } from '../../handlers';
import Alert from '../ui/Alert';

const { contactUs, common } = getMetaDetails();

const ContactUs = () => {
    const [form, setForm] = useState({});
    const [error, setError] = useState({});
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(null);

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

    const onSubmit = async () => {
        const hasFormValid = validate();
        if (hasFormValid) {
            setLoading(true);
            setAlert({});
            const success = await postContact(form);
            setAlert({
                type: success ? 'success' : 'error',
                alert: success ? contactUs.successAlert : common.serverError
            });
            if (success) {
                setForm({});
            }
            setLoading(false);
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
                    const formAttr = {
                        className: error[key] ? 'input-error' : '',
                        onChange: e => onChangeHandler(key, e.target.value),
                        name: key,
                        type,
                        placeholder,
                        value: form[key] || ''
                    };
                    return (
                        <div key={key} className="form-field">
                            <label htmlFor={key}>
                                {label} {required && (<span className='asterisk'> * </span>)}
                            </label>
                            {type === 'textarea' ? <textarea { ...formAttr } /> : <input { ...formAttr } />}
                            {error[key] && <span className='error-msg'>{error[key]}</span>}
                        </div>
                    )
                })}
            </div>
            <button disabled={loading} type='submit'>{loading ? common.loading : contactUs.submit}</button>
        </Wrapper>
    );
}

export default ContactUs;
