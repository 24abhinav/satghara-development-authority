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
        { name: "Visitors Contact", url: "/sdf-admin/visitors-contact" },
        { name: "Donations", url: "/sdf-admin/donation" },
        { name: "Org Users", url: "/sdf-admin/org-user" },
        { name: "Page Meta", url: "/sdf-admin/page-meta" },
        { name: "Programs", url: "/sdf-admin/programs" },
        { name: "Youtube", url: "/sdf-admin/youtube" },
    ],
    donationPage: {
        filters: [
            { placeholder: { english: 'Name', hindi: 'नाम'}, key: 'name', type: 'text' },
            { placeholder: { english: 'Amount', hindi: 'मात्रा'}, key: 'amount', type: 'number' },
            { placeholder:  { english: 'Date', hindi: 'तारीख'}, key: 'day', type: 'number' },
            { placeholder:  { english: 'Month', hindi: 'महीना'}, key: 'month', type: 'select' },
            { placeholder:  { english: 'Year', hindi: 'वर्ष'}, key: 'year', type: 'number' },
        ]
    },
    addDonation: {
        form: [
            { name: 'name', label: 'Donor Name', errorMsg: 'Please enter donor name', type: 'text', required: true },
            { name: 'amount', label: 'Donation Amount', errorMsg: 'Please enter donation amount', type: 'number', required: true },
            { name: 'comments', label: 'Comments', errorMsg: 'Comments', type: 'text', required: false },
            { name: 'notes', label: 'notes (Admin view only)', errorMsg: 'Notes', type: 'text', required: false },
        ]
    },

    adminUser: {
        formField: [
            { name: 'name', label: 'User Name', type: 'text', required: true },
            { name: 'designation', label: 'User Designation', type: 'text', required: true },
            { name: 'email', label: 'User Email', type: 'email', required: true },
            { name: 'mobile', label: 'User Mobile', type: 'number', required: false },
            { name: 'role', label: 'User Role', type: 'text', required: false }
        ]
    },
    programs: {
        formField: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'text', required: true },
            { name: 'detailspageurl', label: 'Details Page Url', type: 'text', required: true },
            { name: 'address', label: 'Center Address', type: 'text', required: false },
            // { name: 'maintainer_name', label: 'Maintainer Name', type: 'text', required: true },
            // { name: 'maintainer_mobile', label: 'Maintainer Mobile', type: 'number', required: true },
            // { name: 'maintainer_address', label: 'Maintainer Address', type: 'text', required: false },
            { name: 'alerts', label: 'Alert for programs (e.g: Upcoming)', type: 'text', required: false },
        ]
    },
    youtube: {
        form: [
            { name: 'platform', label: 'Platform', type: 'text', required: true },
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'url', label: 'Youtube URL', type: 'text', required: true },
        ]
    },
});

export default ADMIN_STATIC;
