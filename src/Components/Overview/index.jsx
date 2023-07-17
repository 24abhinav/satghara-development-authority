import React, { useEffect, useState } from 'react';
import Wrapper from './style';
import { getMetaDetails } from '../../handlers';

const { overviewPage } = getMetaDetails();
const programLength = Object.keys(overviewPage.programList).length;

const Overview = () => {
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
            <h4 className='m-b-20'>{overviewPage.heading}</h4>
            {Object.keys(overviewPage.programList).map((key, index) => {
                    const { imageUrl = '', heading = '', overview = '', upcoming = '' } = overviewPage.programList[key];

                    return (
                        <React.Fragment key={heading}>
                            { count === (index + 1) ? (
                                <div className="overview">
                                    {upcoming && <p className='upcoming-flag'>{upcoming}</p>}
                                    <img src={imageUrl} alt={heading} />
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
