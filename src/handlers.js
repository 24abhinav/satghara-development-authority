import Axios from 'axios';
import Manifest from './manifest';
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

export const postContact = async (payload) => {
    try {
        const { data: { status = 500 } = {} } = await Axios.post(`${Manifest.apiBashUrl}/contact`, payload);
        return status === 200;
    } catch (err) {
        return false;
    }
};

fetchMetaDetails()