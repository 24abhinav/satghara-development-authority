import React, { useState } from 'react';
import Wrapper from './style';
import { getMetaDetails } from '../../handlers';
import Manifest from '../../manifest';

const Overview = () => {
    const { overviewPage: { programList = {}, heading = '' } = {} } = getMetaDetails();
    const programListKey = Object.keys(programList);
    const programLength = programListKey.length;

    const [count, setCount] = useState(1);

    const changeView = (type = 'inc') => {
        if(type === 'inc') {
            const increase = count + 1;
            setCount(increase > programLength ? 1 : increase);
        } else {
            const decrease = count - 1;
            setCount(decrease < 1 ? programLength : decrease);
        }
    };

    return (
        <Wrapper>
            <h4 className='m-b-20'>{heading} <span>({programLength})</span></h4>
            {programListKey.map((key, index) => {
                    const { imageUrl = '', heading = '', overview = '', upcoming = '' } = programList[key];

                    return (
                        <React.Fragment key={heading}>
                            { count === (index + 1) ? (
                                <div className="overview">
                                    {upcoming && <p className='upcoming-flag'>{upcoming}</p>}
                                    <img src={`${Manifest.apiBashUrl}/static/${imageUrl}`} alt={heading} />
                                    <div className="program-details">
                                        <h4 className='m-b-15'>{heading}</h4>
                                        <p dangerouslySetInnerHTML={{__html: overview}} />
                                    </div>
                                </div>
                            ) : null}
                        </React.Fragment>
                    )
                })}
            <div className="change-program-btn">
                <button onClick={() => changeView('deg')}>{`<`}</button>
                <button onClick={() => changeView('inc')}>{`>`}</button>
            </div>
        </Wrapper>
    );
}

export default Overview;
