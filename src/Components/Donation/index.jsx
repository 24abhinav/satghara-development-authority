import React from 'react';
import Wrapper from './style';
import { getMetaDetails } from '../../handlers';
import Table from '../ui/Table';

const { donation } = getMetaDetails();

console.log(donation)

const Donation = () => {
    return (
        <Wrapper className='page-width'>
            <h3>{donation.heading}</h3>
            <Table>
                <thead>
                    <tr>
                        {donation.tableHeading.map(el => (
                            <th key={el}>{el}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {donation.donor.map(({ name, amount, donationDate }) => (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{amount.toLocaleString('en-IN')}</td>
                            <td>{donationDate}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h3>{donation.totalDonation} : 1,00,000</h3>
        </Wrapper>
    );
}

export default Donation;
