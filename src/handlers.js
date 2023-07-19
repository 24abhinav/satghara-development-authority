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
    meta = { ...(Meta[selectedLanguage] || {}), selectedLanguage, assetsBaseUrl: 'https://satghara-development-foundation-server.vercel.app' };
    console.log(meta)
};

export const postContact = async (payload) => {
    try {
        await Axios.post(`${Manifest.apiBashUrl}/contact`, payload);
        return true;
    } catch (err) {
        return false;
    }
};

fetchMetaDetails()