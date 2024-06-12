import React, { useEffect, useState } from 'react';
import Wrapper from './style';
import Table from '../../ui/Table';
import {
    changeContactStatusHandler,
    deleteContactHandler,
    getVisitorsContactHandler
} from '../handlers';
import ADMIN_STATIC from '../constant';
import Toast from '../../ui/Toast';


const initialFilter = {
    active: true,
    year: new Date().getFullYear()
};

const VisitorsContact = () => {
    const [filter, setFilter] = useState({ ...initialFilter });
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState();

    const getVisitorsList = async () => {
        setLoading(true);
        const { data: { visitorsList = [] } = {}} = await getVisitorsContactHandler(filter);
        setList(visitorsList);
        setLoading(false);
    };

    useEffect(() => {
        getVisitorsList();
    }, [filter]);

    const serverError = () => {
        alert('error');
    };

    const deleteRecord = async id => {
        const { ok } = await deleteContactHandler({ id })
        if (ok) {
            getVisitorsList();
            setToast({ msg: 'Contact deleted '});
        } else {
            serverError();
        }
    };

    const contacted = async id => {
        const { ok } = await changeContactStatusHandler({ id });
        if (ok) {
            getVisitorsList();
            setToast({ msg: 'Contacted'});
        } else {
            serverError();
        }
    };

    const onSearch = e => {
        e.preventDefault();
        const newFilter = {};
        const formData  = new FormData(e.currentTarget);
        for (let [key, value] of formData.entries()) {
            if (value) {
                newFilter[key] = value;
            }
        }
        const { active = '' } = newFilter;
        setFilter({
            ...newFilter,
            active: !!active
        });
    };

    const mappingActionButton =  {
        delete: deleteRecord,
        contacted
    };

    const actionHandler = (key, id) => {
        const confirm = window.confirm('Confirmation');
        if (confirm) {
            mappingActionButton[key](id)
        }
    };

    const ActionButton = ({ id, active }) => (
        <>
            <button onClick={() => actionHandler('delete', id)} title='Delete'><span className="fa fa-trash-o"></span></button>
            {active && <button onClick={() => actionHandler('contacted', id)} title='Contacted'><span className="fa fa-check"></span></button>}
        </>
    );

    const MobileList = () => {
        return (
            <div className="mobile-list">
                {list?.map(({ id, name, mobile, day, month, year, description, active = false}) => (
                    <ul key={id}>
                        <li>
                            <span>Name:</span>
                            <span>{name}</span>
                        </li>
                        <li>
                            <span>Mobile:</span>
                            <span>{mobile}</span>
                        </li>
                        <li>
                            <span>Date:</span>
                            <span>{day} {month} {year}</span>
                        </li>
                        <li>
                            <span>Description:</span>
                            <span>{description}</span>
                        </li>
                        <li className='action-btn'>
                            <span>Action</span>
                            <div>
                                <ActionButton active={active} id={id} />
                            </div>
                        </li>
                    </ul>
                ))}
            </div>
        )
    };


    return (
        <Wrapper className='m-b-20'>
            {toast && <Toast { ...toast } /> }
            <form onSubmit={onSearch} className="m-b-20">
                <div className='filter-section'>
                    {ADMIN_STATIC.visitorsContactPage.filters.map(({ placeholder, key, type, attr = {} }) => (
                        <div className={`form-field m-r-20 ${key === 'active' ? 'active-check' : ''}`} key={key}>
                            {
                                type === 'select' ? (
                                    <select name='month' { ...attr }>
                                        {['Month', ...ADMIN_STATIC.monthsArray].map(mon => (
                                            <option key={mon} value={mon === 'Month' ? '' : mon.toLowerCase()}>{mon}</option>
                                        ))}
                                    </select>
                                ): (
                                    <input { ...attr } defaultValue={initialFilter[key] || ''} name={key} type={type} placeholder={placeholder} />
                                )
                            }
                            {key === 'active' ? <label>Active</label> : null}
                        </div>
                    ))}
                    <button disabled={loading} className='primary-btn btn m-r-20' type='submit'>{loading ? 'Searching' : 'Search'}</button>
                    <button className='icon-btn danger' type='reset'><span className="fa fa-close"></span></button>
                </div>
            </form>
            {
                list.length ? (
                    <div className="contact-list">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list?.map(({ id, name, mobile, day, month, year, description, active }) => (
                                    <tr key={id}>
                                        <td>{name}</td>
                                        <td>{mobile}</td>
                                        <td>{day} {month} {year}</td>
                                        <td>{description}</td>
                                        <td className='action-btn'>
                                            <ActionButton id={id} active={active} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <MobileList list={list} />
                    </div>
                ) : <p className='no-data'>No Data found</p>
            }
        </Wrapper>
    );
}

export default VisitorsContact;
