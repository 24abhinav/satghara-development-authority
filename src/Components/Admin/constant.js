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
        { name: "Visitors Contact", url: "/sdaAdmin/visitors-contact" },
        { name: "Donations", url: "/sdaAdmin/donation" },
        { name: "Add new Admin", url: "/sdaAdmin/add-user" },
        { name: "Page Meta", url: "/sdaAdmin/page-meta" },
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
    },

    adminUser: {
        formField: [
            { name: 'name', label: 'User Name', errorMsg: 'Please enter user name', type: 'text', required: true },
            { name: 'email', label: 'User Email', errorMsg: 'Please enter user email', type: 'email', required: true },
            { name: 'mobile', label: 'User Mobile', errorMsg: 'Please enter user mobile', type: 'number', required: false }
        ]
    }
});

export default ADMIN_STATIC;
