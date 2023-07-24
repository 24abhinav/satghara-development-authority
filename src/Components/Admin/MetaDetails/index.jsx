import React, { useEffect, useState } from 'react';
import Wrapper from './style';
import { fetchMetaDetailsForAdmin } from '../handlers';

const MetaDetails = () => {
    const [meta, setMeta] = useState('');

    const getPageMeta = async () => {
        const { ok, data: { fullResponse = {} } } = await fetchMetaDetailsForAdmin();
        if (ok) {
            setMeta(JSON.stringify(fullResponse))
        }
    };

    useEffect(() => {
        getPageMeta();
    }, []);

    return (
        <Wrapper>
            <div className="form-field">
                <textarea value={meta} rows="20"></textarea>
            </div>
        </Wrapper>
    );
}

export default MetaDetails;
