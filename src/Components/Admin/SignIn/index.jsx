import React, { useState } from 'react';
import Wrapper from './style';
import { adminSignInHandler } from '../handlers';
import Alert from '../../ui/Alert';

const SignIn = () => {
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const userSignIn = async e => {
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
        const { ok, headers } = await adminSignInHandler(formData);
        if (!ok) {
            setError({ apiError: true });
            setLoading(false);
        } else {
            const { 'x-session-token': token = '' } = headers;
            if (token) {
                localStorage.setItem('x-session-token', token);
                window.location.reload();
            }
        }
    };

    return (
        <Wrapper>
            <h3>Admin Console Sign In</h3>
            {error.apiError && <Alert alert="Please check your email or password" type="error" />}
            <div className="admin-sign-in m-b-20">
                <form onSubmit={userSignIn}>
                    <div className="form-field">
                        <label>Email <span className="asterisk">*</span></label>
                        <input type="text" name="email" required />
                    </div>
                    <div className="form-field">
                        <label>Password <span className="asterisk">*</span></label>
                        <input type="password" name="password" required />
                    </div>
                    <button disabled={loading} className='primary btn'>Sign In</button>
                </form>
            </div>
        </Wrapper>
    );
}

export default SignIn;
