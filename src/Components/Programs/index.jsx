import React, { useEffect, useRef, useState } from 'react';
import Wrapper from './style';
import Manifest from '../../manifest';
import { getMetaDetails, getPrograms } from '../../handlers';
import { Link } from 'react-router-dom';

const ProgramDetails = () => {
    const [slider, setSlider] = useState([]);
    const [count, setCount] = useState(0);
    const { overviewPage = {} } = getMetaDetails() || {};
    const pageRefs = useRef({ programList: [] });

    const { current: { programList = [] }} = pageRefs;

    const changeLayout = (source = '', int = '') => {
        let newCount = source === 'increase' ? count + 1 : count - 1;
        console.log({ newCount, len: programList.length});
        if (newCount > programList.length) {
            newCount = 0;
        } else if (newCount < 0) {
            newCount = programList.length - 1;
        }
        setSlider(programList[newCount]);
        setCount(newCount);
    };

    const onChange = (source = '') => {
        clearInterval(pageRefs.current.interval);
        changeLayout(source);
    };
    
    const initialData = async () => {
        const response = await getPrograms() || [];
        setSlider(response[0] || {});
        pageRefs.current.programList = response;
    };

    useEffect(() => {
        initialData();
    }, []);

    const {
        programid = '',
        imageurl = '',
        title = '',
        description = '',
        alerts = '',
        detailspageurl = ''
    } = slider;
    const hasLongDescription = description.length > 450;

    return (
        <Wrapper>
            {programid && (
                <div className="program-slider">
                    <div className='program-image'>
                        {alerts && <small className='chip success'>{alerts}</small>}
                        <img src={`${Manifest.apiBashUrl}/static/Assets/${imageurl}`} alt={title} />
                    </div>
                    <div className='program-details'>
                        <h5>{title}</h5>
                        <p>{description.slice(0, 450)}{hasLongDescription && '...'}</p>
                        <div className='arrows'>
                            {count !== 0 ? (
                                <button onClick={() => onChange('decrease')}>
                                    <i className='fa fa-arrow-left'></i>
                                </button>
                            ): <span />}
                            {detailspageurl && <Link to={`programs/${detailspageurl}`} className='btn primary'>{overviewPage.moreDetailsBtnText}</Link>}
                            {count < (programList.length - 1) ? (
                                <button onClick={() => onChange('increase')}>
                                    <i className='fa fa-arrow-right'></i>
                                </button>
                            ) : <span />}
                        </div>
                    </div>
                </div>
            )}
        </Wrapper>
    );
}

export default ProgramDetails;