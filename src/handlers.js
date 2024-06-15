import Axios from 'axios';
import Manifest from './manifest';
import META from './Meta.json';
import { fetchMetaDetailsHandler } from './Components/Admin/handlers';

let meta = null;

const caching = {};

export const axiosInstance = async (axiosOption) => {
    try {
        let selectedLanguage = localStorage.getItem('selectedLanguage');
        if (!['hindi', 'english'].includes(selectedLanguage)) {
            selectedLanguage = 'english';
            localStorage.setItem('selectedLanguage', 'english');
        }
        const { params = {} } = axiosOption;
        const { data = {}, status, headers: respHeader } = await Axios({
            ...axiosOption,
            baseURL: Manifest.apiBashUrl,
            params: { ...params, lng: selectedLanguage }
        });
        return { status, data, ok: true, headers: respHeader };
    } catch (err) {
        const { response: { status = 500 } = {} } = err;
        if (status === 401) {
            localStorage.clear();
            window.location.reload();
        }
        return { ok: false, status };
    }
};


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

export const postContact = async (data) => {
    const { ok } = await axiosInstance({
        method: 'post',
        url: 'contact',
        data
    });
    return ok;
};

export const getDonationHandler = async (filter = {}) => {
    try {
        const { data = {} } = await Axios.get(`${Manifest.apiBashUrl}/donation`, { params: filter });
        return data;
    } catch (err) {
        return [];
    }
};

export const getPrograms = async () => {
    if (caching.programs) {
        return caching.programs;
    }
    try {
        const lng = localStorage.getItem('selectedLanguage') || 'english'
        const { data = {} } = await Axios.get(`${Manifest.apiBashUrl}/programs`, { params: { lng }});
        caching.programs = data;
        return data;
    } catch (err) {
        return [];
    }
};


export const getYoutubeVideosHandler = async () => {
    if (!caching.youtubeVideos) {
        const { data = [] } = await axiosInstance({
            method: 'get',
            url: 'youtube-videos'
        });
        caching.youtubeVideos = data;
    }
    return caching.youtubeVideos;
};
