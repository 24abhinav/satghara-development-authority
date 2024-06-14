import React, { useEffect, useState } from 'react';
import Wrapper from './style';
import Manifest from '../../manifest';
import { getPrograms } from '../../handlers';
import { Link } from 'react-router-dom';

const Programs = () => {
    const [programList, setProgramList] = useState([]);
    const [slider, setSlider] = useState([]);
    const [count, setCount] = useState(0);

    const changeLayout = ({ target: { name = '' } = {}}) => {
        const newCount = name === 'increase' ? count + 1 : count - 1;
        setSlider([programList[newCount]]);
        setCount(newCount);
    };
    
    const initialData = async () => {
        const response = await getPrograms();
        setSlider([{ ...response[0] || []}]);
        setProgramList(response);
    };

    useEffect(() => {
        initialData()
    }, []);

    return (
        <Wrapper>
            <div>
                {slider.map((program = {}) => {
                    const { id, imageurl, title, description, alerts, detailspageurl } = program;
                    return (
                        <div key={id} className="program-slider">
                            <div className='program-image'>
                                {alerts && <small className='chip success'>{alerts}</small>}
                                <img src={`${Manifest.apiBashUrl}/static/${imageurl}`} alt={title} />
                            </div>
                            <div className='program-details'>
                                <h5>{title}</h5>
                                <p>{description}</p>
                                <div className='arrows'>
                                    {count !== 0 ? (
                                        <button name='decrease' onClick={changeLayout}>
                                            <i className='fa fa-arrow-left'></i>
                                        </button>
                                    ): <span />}
                                    {detailspageurl && <Link to={detailspageurl} className='btn primary'>Get More Details</Link>}
                                    {count < (programList.length - 1) ? (
                                        <button name='increase' onClick={changeLayout}>
                                            <i className='fa fa-arrow-right'></i>
                                        </button>
                                    ) : <span />}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Wrapper>
    );
}

export default Programs;