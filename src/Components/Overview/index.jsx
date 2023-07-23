import React, { useEffect, useState } from 'react';
import Wrapper from './style';
import { getDonationHandler, getMetaDetails } from '../../handlers';
// import Manifest from '../../manifest';

const Overview = () => {
    const { overviewPage: { heading = '', tile = {}, overviewContent = '' } = {} } = getMetaDetails();
    const [tilesValue, setTileValue] = useState({});

    const getDonationOverview = async () => {
        const { totalDonation = 0, totalDonorCount = 0} = await getDonationHandler({ countOnly: true });
        setTileValue({ totalDonation, totalDonorCount });
    };

    useEffect(() => {
        getDonationOverview();
    }, []);

    return (
        <Wrapper className='page-width'>
            <h4 className='m-b-20'>{ heading }</h4>
            <div className="tiles m-b-20">
                {Object.keys(tile).map(key => {
                    const {[key]: { label = '', value = 0}  = {}} = tile;
                    return (
                        <div key={key}>
                            <span>{label}</span>
                            <span>{(tilesValue[key] || value).toLocaleString('en-IN')}</span>
                        </div>
                    )
                })}
            </div>
            <div className="overview-section">
                <p>{overviewContent}</p>
            </div>
        </Wrapper>
    );
}

export default Overview;
