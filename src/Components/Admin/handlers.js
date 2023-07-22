import Axios from 'axios';
import Manifest from '../../manifest';

export const axiosInstance = async (axiosOption) => {
    try {
        const { headers = {} } = axiosOption;
        const { data = {}, status, headers: respHeader } = await Axios({
            ...axiosOption,
            baseURL: Manifest.apiBashUrl,
            headers: {
                ...headers,
                'sid': localStorage.getItem('sid') || ''
            },
        });
        return { status, data, ok: true, headers: respHeader };
    } catch (err) {
        const { response: { status = 500 } = {} } = err;
        if (status === 401) {
            localStorage.removeItem('sid');
            window.location.reload();
        } else {
            return { ok: false };
        }
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

export const adminSignInHandler = ( payload ) => {
    return axiosInstance({
        method: 'post',
        url: 'admin/sign-in',
        data: { ...payload }
    });
};

export const addAdminUserHandler = ( payload ) => {
    return axiosInstance({
        method: 'post',
        url: 'admin/add-user',
        data: { ...payload }
    });
};