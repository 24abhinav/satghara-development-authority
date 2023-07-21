import React from 'react';
import Wrapper from './style';
import { getMetaDetails } from '../../handlers';
import Table from '../ui/Table';


const Donation = ({ showHeading = true }) => {
    const { donation: { heading = '', tableHeading = [], donor = [], totalDonation = 0 } = {} } = getMetaDetails();
    return (
        <Wrapper className='page-width'>
            {showHeading && (<h3>{heading}</h3>)}
            <Table>
                <thead>
                    <tr>
                        {tableHeading.map(el => (
                            <th key={el}>{el}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {donor.map(({ name, amount, donationDate }) => (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{amount.toLocaleString('en-IN')}</td>
                            <td>{donationDate}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h3>{totalDonation} : 1,00,000</h3>
        </Wrapper>
    );
}

export default Donation;
