import React, { useEffect, useState } from 'react';
import Wrapper from './style';
import { getDonationHandler, getMetaDetails } from '../../handlers';
import Table from '../ui/Table';
import Manifest from '../../manifest';
import ActionButton from '../ui/ActionButton';

export const DonationTable = ({ filter, isAdmin = false, changeDonation }) => {
    const { donation: { tableHeading = [], totalDonationLabel = '' } = {} } = getMetaDetails();
    const [donationDetails, setDonation] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const selectedLng = localStorage.getItem('selectedLanguage') || 'english';

    return (
        <div className="donation-table">
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


const Donation = ({ showHeading = true, filter = {} }) => {
    const { donation: { heading = '' } } = getMetaDetails();
    
    return (
        <Wrapper className='page-width'>
            {showHeading && (<h3>{heading}</h3>)}
            <DonationTable />
        </Wrapper>
    );
}

export default Donation;
