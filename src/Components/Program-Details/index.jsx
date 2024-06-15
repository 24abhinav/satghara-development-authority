import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from './style';
import { getMetaDetails, getProgramsByUrlHandler } from '../../handlers';
import Manifest from '../../manifest';

const Hospital = () => {
    const { programDetails: { maintainer = {}, centerAddress = '' } = {} } = getMetaDetails() || {};
    const { url = 'hospital' } = useParams();
    const [programDetails, setDetails] = useState({});
    const {
        title = '',
        description = '',
        imageurl = '',
        maintainer_name = '',
        maintainer_mobile = '',
        maintainer_address = '',
        address = ''
    } = programDetails;
    const initialData = async () => {
        const [details = {}] = await getProgramsByUrlHandler(url) || [];
        setDetails(details);
    };

    useEffect(() => {
        initialData();
    }, []);

    return (
        <Wrapper className='page-width'>
            <h1>{title}</h1>
            {address && <p>{centerAddress}: {address}</p> }
            <div className='details-section'>
                <img className='fixed-height' src={`${Manifest.apiBashUrl}/static/${imageurl}`} alt={title} />
                <p>{description}</p>
            </div>
            <div className='contact-info'>
                <div>
                    <h3>{maintainer.heading}</h3>
                    <p>{maintainer.name}: <b>{maintainer_name}</b></p>
                    <p>{maintainer.mobile}: <b>{maintainer_mobile}</b> </p>
                    {maintainer_address && <p>{maintainer.address}: <b>{maintainer_address}</b></p>}
                </div>
            </div>
        </Wrapper>
    );
}

export default Hospital;