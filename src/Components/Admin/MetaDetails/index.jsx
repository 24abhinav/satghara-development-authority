import React, { useEffect, useState } from 'react';
import Wrapper from './style';
import { fetchMetaDetailsHandler, saveMetaDetailsHandler } from '../handlers';
import Toast from '../../ui/Toast';

const MetaDetails = () => {
    const [meta, setMeta] = useState('');
    const [toast, setToast] = useState();

    const getPageMeta = async () => {
        const { ok, data: { fullResponse = {} } } = await fetchMetaDetailsHandler();
        if (ok) {
            console.log(JSON.stringify(fullResponse));
            setMeta(JSON.stringify(fullResponse));
        }
    };

    useEffect(() => {
        getPageMeta();
    }, []);

    const onMetaSave = async () => {
        const { ok } = await saveMetaDetailsHandler(meta);
        if (ok) {
            setToast({ msg: 'Meta details saved '});
        } else {
            setToast({ msg: 'Server error'});
        }
    };

    return (
        <Wrapper className='m-b-20'>
            {toast && <Toast { ...toast } /> }
            <div className="form-field m-b-20">
                <textarea onChange={(e) => setMeta(e.target.value)} value={meta} rows="20"></textarea>
            </div>
            <button className='primary-btn' onClick={onMetaSave}>Save</button>
        </Wrapper>
    );
}

export default MetaDetails;
