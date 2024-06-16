import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Wrapper from './style';
import { getMetaDetails, getProgramsByUrlHandler, getVideoByProgramIdHandler } from '../../handlers';
import Manifest from '../../manifest';

const Hospital = () => {
    const { programDetails: { maintainer = {}, centerAddress = '', youtubeContent = '' } = {} } = getMetaDetails() || {};
    const { url = 'hospital' } = useParams();
    const [programDetails, setDetails] = useState({});
    const [videos, setVideos] = useState([]);

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
        setVideos(await getVideoByProgramIdHandler(details));
    };

    useEffect(() => {
        initialData();
    }, []);

    return (
        <Wrapper className='page-width'>
            <Link className='back-link' to="/">Back</Link>
            <h1>{title}</h1>
            {address && <p>{centerAddress}: <b>{address}</b></p> }
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
            <div className='videos'>
                <h4>{youtubeContent}</h4>
                <div className='cards'>
                    {videos.map(({ url }) => (
                        <div>
                            <iframe key={url} src={`https://www.youtube.com/embed/${url}`} allowFullScreen />
                        </div>
                    ))}
                </div>
            </div>
        </Wrapper>
    );
}

export default Hospital;