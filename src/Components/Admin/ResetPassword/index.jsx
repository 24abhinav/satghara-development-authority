import React, { useState } from 'react';
import Wrapper from './style';
import { setAdminPasswordHandler } from '../handlers';
import Alert from '../../ui/Alert';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    const createNewPassword = async e => {
        e.preventDefault();
        setError({});
        setLoading(true);
        const formData = {};
        const form  = new FormData(e.currentTarget);
        for (let [key, value] of form.entries()) {
            if (value) {
                formData[key] = value;
            }
        }
        const { ok } = await setAdminPasswordHandler({ ...formData, token });
        if (!ok) {
            setError({ apiError: true });
            setLoading(false);
        } else {
            navigate('/sdfAdmin/visitors-contact')
        }
    };

    return (
        <Wrapper>
            <h3>Admin Console Sign In</h3>
            {error.apiError && <Alert alert="Server Error" type="error" />}
            <div className="admin-sign-in m-b-20">
                <form onSubmit={createNewPassword}>
                    <div className="form-field">
                        <label>Password <span className="asterisk">*</span></label>
                        <input type="password" name="password" required />
                    </div>
                    <button disabled={loading} className='primary-btn'>Set Password</button>
                </form>
            </div>
        </Wrapper>
    );
}

export default ResetPassword;
