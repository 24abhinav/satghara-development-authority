import React, { useState } from 'react';
import Wrapper from './style';
import { adminSignInHandler } from '../handlers';

const SignIn = () => {
    const [error, setError] = useState({});
    const userSignIn = async e => {
        e.preventDefault();
        setError({});
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
        } else {
            const { sid = '' } = headers;
            if (sid) {
                localStorage.setItem('sid', sid);
                window.location.reload();
            }
        }
    };

    return (
        <Wrapper>
            <h3>Admin Console Sign In</h3>
            {error.apiError && <p>Please check your username or password</p>}
            <div className="admin-sign-in m-b-20">
                <form onSubmit={userSignIn}>
                    <div className="form-field">
                        <label>Username <span className="asterisk">*</span></label>
                        <input type="text" name="username" required />
                    </div>
                    <div className="form-field">
                        <label>Password <span className="asterisk">*</span></label>
                        <input type="password" name="password" required />
                    </div>
                    <button className='primary-btn'>Sign In</button>
                </form>
            </div>
        </Wrapper>
    );
}

export default SignIn;
