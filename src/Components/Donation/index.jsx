import React, { useEffect, useState } from 'react';
import Wrapper from './style';
import { getDonationHandler, getMetaDetails } from '../../handlers';
import Table from '../ui/Table';
import Manifest from '../../manifest';
import ActionButton from '../ui/ActionButton';
import ADMIN_STATIC from '../Admin/constant';

const initialFilter = { year: new Date().getFullYear() };
const selectedLng = localStorage.getItem('selectedLanguage') || 'english';

const FilterComponent = ({ setFilter, loading }) => {
    const onSearch = e => {
        e.preventDefault();
        const newFilter = {};
        const formData  = new FormData(e.currentTarget);
        for (let [key, value] of formData.entries()) {
            if (value) {
                newFilter[key] = value;
            }
        }
        setFilter({ ...newFilter });
    };
    return (
        <form onSubmit={onSearch} className="m-b-20">
            <div className='filter-section'>
                {ADMIN_STATIC.donationPage.filters.map(({ placeholder, key, type, attr = {} }) => (
                    <div className={`form-field m-r-20`} key={key}>
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
                    </div>
                ))}
                <button disabled={loading} className='primary-btn m-r-20' type='submit'>{loading ? 'Searching' : 'Search'}</button>
                <button className='icon-btn danger' type='reset'><span className="fa fa-close"></span></button>
            </div>
        </form>
    )
}


export const DonationTable = ({ isAdmin = false, changeDonation, parentFilter = {} }) => {
    const { donation: { tableHeading = [], totalDonationLabel = '' } = {} } = getMetaDetails();
    const [donationDetails, setDonation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({ ...initialFilter });

    const { list: donationList = [], totalDonation = 0 } = donationDetails;

    const getDonation = async () => {
        setLoading(true);
        const response = await getDonationHandler(filter);
        setLoading(false);
        setDonation(response);
    };

    useEffect(() => {
        getDonation();
    }, [filter]);

    return (
        <div className="donation-table">
            <FilterComponent setFilter={setFilter} loading={loading} />
            <Table>
                <thead>
                    <tr>
                        {[ ...tableHeading, ...(isAdmin ? [''] : [])].map(el => (
                            <th key={el}>{el}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {donationList.map(item => {
                        const { amount, day, month, year, id, ...restOption } = item;
                        const { [selectedLng]: content = '{}'} = restOption;
                        const { name = '' } = JSON.parse(content);
                        const { [month]: hindiMonth = '' } = Manifest.hindiMonths;
                        return(
                            <tr key={id}>
                                <td>{name}</td>
                                <td>{Number(amount).toLocaleString('en-IN')}</td>
                                <td>{day} {selectedLng === 'hindi' ? hindiMonth : month } {year}</td>
                                {isAdmin && (
                                    <td>
                                        <ActionButton onClick={() => changeDonation({ type: 'delete', id })} className="fa fa-trash-o" />
                                        <ActionButton onClick={() => changeDonation({ type: 'update', ...item })} className="fa fa-pen" />
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {loading && <p>Loading latest Donation ...</p>}
            <h3>{totalDonationLabel} : {totalDonation.toLocaleString('en-IN')}</h3>
        </div>
    );
};


const Donation = ({ showHeading = true }) => {
    const { donation: { heading = '' } } = getMetaDetails();
    
    return (
        <Wrapper className='page-width'>
            {showHeading && (<h3>{heading}</h3>)}
            <DonationTable />
        </Wrapper>
    );
}

export default Donation;
