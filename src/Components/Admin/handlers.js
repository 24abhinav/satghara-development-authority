import Axios from 'axios';
import Manifest from '../../manifest';

export const axiosInstance = async (axiosOption) => {
    try {
        const { headers = {} } = axiosOption;
        const { data = {}, status } = await Axios({
            ...axiosOption,
            baseURL: Manifest.apiBashUrl,
            headers: {
                ...headers,
                'access-token': 'token'
            },
        });
        return { status, data, ok: true };
    } catch (err) {
        return { ok: false };
    }
};

export const addNewDonationHandler = (payload = {}) => {
    return axiosInstance({
        method: 'post',
        url: 'donation',
        data: { ...payload }
    });
};

export const updateDonationHandler = ({ id, ...restParams } = {}) => {
    return axiosInstance({
        method: 'patch',
        url: 'donation',
        data: { ...restParams },
        params: { id }
    });
};

export const deleteDonationHandler = ( id ) => {
    return axiosInstance({
        method: 'delete',
        url: 'donation',
        params: { id }
    });
};