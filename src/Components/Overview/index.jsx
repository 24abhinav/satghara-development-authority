import React, { useState } from 'react';
import Wrapper from './style';
import { getMetaDetails } from '../../handlers';
// import Manifest from '../../manifest';

const Overview = () => {
    const { overviewPage: { heading = '', tile = {}, overviewContent = '' } = {} } = getMetaDetails();
    const [tiles] = useState({ ...tile });

    return (
        <Wrapper className='page-width'>
            <h4 className='m-b-20'>{ heading }</h4>
            <div className="tiles m-b-20">
                {Object.keys(tiles).map(key => {
                    const {[key]: { label = '', value = 0}  = {}} = tiles;
                    return (
                        <div key={key}>
                            <span>{label}</span>
                            <span>{value.toLocaleString('en-IN')}</span>
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
