import Axios from 'axios';
import Manifest from './manifest';
import META from './Meta.json';
import { fetchMetaDetailsHandler } from './Components/Admin/handlers';

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

export const fetchMetaDetails = async ({ otherParams = {} } = {}) => {
    let metaDetails = null;
    let selectedLanguage = localStorage.getItem('selectedLanguage');
    if (!['hindi', 'english'].includes(selectedLanguage)) {
        selectedLanguage = 'english';
        localStorage.setItem('selectedLanguage', 'english');
    }
    try {
        const { data: { meta = {}, ...otherMeta} = {} } = await fetchMetaDetailsHandler({ language: selectedLanguage, fullResponse: false });
        metaDetails = { ...meta, ...otherMeta };
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
