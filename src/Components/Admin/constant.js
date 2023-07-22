const ADMIN_STATIC = Object.freeze({
    monthsArray: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    visitorsContactPage: {
        filters: [
            { placeholder: 'Active', key: 'active', type: 'checkbox', attr: { defaultChecked: true } },
            { placeholder: 'Name', key: 'name', type: 'text' },
            { placeholder: 'Mobile', key: 'mobile', type: 'number' },
            { placeholder: 'Date', key: 'day', type: 'number' },
            { placeholder: 'Month', key: 'month', type: 'select' },
            { placeholder: 'Year', key: 'year', type: 'number' },
        ]
    },
    navOption: [
        { name: "Visitors Contact", url: "/sdpAdmin" },
        { name: "Donations", url: "/sdpAdmin/donation" },
    ],
    donationPage: {
        filters: [
            { placeholder: 'Name', key: 'name', type: 'text' },
            { placeholder: 'Amount', key: 'amount', type: 'number' },
            { placeholder: 'Date', key: 'day', type: 'number' },
            { placeholder: 'Month', key: 'month', type: 'select' },
            { placeholder: 'Year', key: 'year', type: 'number' },
        ]
    },
    addDonation: {
        form: [
            { name: 'name', label: 'Donor Name', errorMsg: 'Please enter donor name', type: 'text', required: true },
            { name: 'amount', label: 'Donation Amount', errorMsg: 'Please enter donation amount', type: 'number', required: true },
        ]
    }
});

export default ADMIN_STATIC;
