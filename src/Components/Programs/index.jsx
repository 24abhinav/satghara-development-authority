import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Wrapper from './style';
import Manifest from '../../manifest';
import { getPrograms } from '../../handlers';
import { Link } from 'react-router-dom';

const Programs = () => {
    const [programList, setProgramList] = useState([]);

    const initialData = async () => {
        setProgramList(await getPrograms());
    };

    useEffect(() => {
        initialData()
    }, []);

    return (
        <Wrapper>
            <Slide>
                {programList.map(program => {
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
                                {detailspageurl && <Link to={detailspageurl} className='btn primary'>Get More Details</Link>}
                            </div>
                        </div>
                    );
                })}
            </Slide>
        </Wrapper>
    );
}

export default Programs;