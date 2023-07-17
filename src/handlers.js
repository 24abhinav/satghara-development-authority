import Meta from './Meta.json';

let meta = {};
export const getMetaDetails = () => meta;
const fetchMetaDetails = async () => {
    let selectedLanguage = localStorage.getItem('selectedLanguage');
    if (!Object.keys(Meta).includes(selectedLanguage)) {
        selectedLanguage = 'english';
        localStorage.setItem('selectedLanguage', 'english');
    }
    meta = { ...(Meta[selectedLanguage] || {}), selectedLanguage };
    console.log(meta)
};

fetchMetaDetails()