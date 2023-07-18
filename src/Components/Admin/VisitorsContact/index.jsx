import React, { useEffect, useState } from 'react';
import Wrapper from './style';
import Table from '../../ui/Table';
import { axiosInstance } from '../handlers';
import ADMIN_STATIC from '../constant';


const initialFilter = {
    active: true
};

const VisitorsContact = () => {
    const [filter, setFilter] = useState({ ...initialFilter });
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getVisitorsList = async () => {
        setLoading(true);
        const { data: { visitorsList = [] } = {}} = await axiosInstance({
            method: 'get',
            url: 'contact',
            params: { ...filter }
        });
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
        const { ok } = await axiosInstance({
            method: 'delete',
            url: 'contact',
            params: { id }
        });
        if (ok) {
            getVisitorsList();
        } else {
            serverError();
        }
    };

    const contacted = async id => {
        const { ok } = await axiosInstance({
            method: 'patch',
            url: 'contact',
            params: { id }
        });
        if (ok) {
            getVisitorsList();
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
            ...filter,
            ...newFilter ,
            active: !!active
        });
    };

    return (
        <Wrapper>
            <form onSubmit={onSearch} className="m-b-20">
                <div className='filter-section'>
                    {ADMIN_STATIC.visitorsContactPage.filters.map(({ placeholder, key, type, attr = {} }) => (
                        <div className="form-field m-r-20" key={key}>
                            {
                                type === 'select' ? (
                                    <select name='month' { ...attr }>
                                        {['Month', ...ADMIN_STATIC.monthsArray].map(mon => (
                                            <option key={mon} value={mon === 'Month' ? '' : mon.toLowerCase()}>{mon}</option>
                                        ))}
                                    </select>
                                ): (
                                    <input { ...attr } name={key} type={type} placeholder={placeholder} />
                                )
                            }
                            {key === 'active' ? <label>Active</label> : null}
                        </div>
                    ))}
                    <button disabled={loading} className='primary-btn m-r-20' type='submit'>{loading ? 'Searching' : 'Search'}</button>
                    <button className='icon-btn danger' type='reset'><span className="fa fa-close"></span></button>
                </div>
            </form>
            {
                list.length ? (
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list?.map(({ id, name, mobile, day, month, year, description}) => (
                                <tr key={id}>
                                    <td>{name}</td>
                                    <td>{mobile}</td>
                                    <td>{day} {month} {year}</td>
                                    <td>{description}</td>
                                    <td className='action-btn'>
                                        <button onClick={() => deleteRecord(id)} title='Delete'><span className="fa fa-trash-o"></span></button>
                                        <button onClick={() => contacted(id)} title='Contacted'><span className="fa fa-check"></span></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : <p>No Contact</p>
            }
        </Wrapper>
    );
}

export default VisitorsContact;
