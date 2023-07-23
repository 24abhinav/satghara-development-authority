import Axios from 'axios';
import Manifest from './manifest';
import META from './Meta.json';

let meta = null;

export const getMetaDetails = () => {
    if (!meta) {
        try {
            meta = JSON.parse(sessionStorage.getItem('pageMeta'));
            if (!meta) {
                throw new Error('');
            }
        } catch (e) {
            fetchMetaDetails();
        }
    }
    return meta || {};
};

export const fetchMetaDetails = async () => {
    let metaDetails = null;
    let selectedLanguage = localStorage.getItem('selectedLanguage');
    if (!['hindi', 'english'].includes(selectedLanguage)) {
        selectedLanguage = 'english';
        localStorage.setItem('selectedLanguage', 'english');
    }
    try {
        const { data = {} } = await Axios.get(`${Manifest.apiBashUrl}/page-meta`, { params: { language: selectedLanguage }});
        metaDetails = { ...data };
    } catch (err) {
        metaDetails = META[selectedLanguage];
    }
    const dataToSave = { ...metaDetails, selectedLanguage };
    sessionStorage.setItem('pageMeta', JSON.stringify(dataToSave));
    return dataToSave;
};

export const postContact = async (payload) => {
    try {
        await Axios.post(`${Manifest.apiBashUrl}/contact`, payload);
        return true;
    } catch (err) {
        return false;
    }
};

export const getDonationHandler = async (filter = {}) => {
    try {
        const { data = {} } = await Axios.get(`${Manifest.apiBashUrl}/donation`, { params: filter });
        return data;
    } catch (err) {
        return [];
    }
};
