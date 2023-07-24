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
                'x-session-token': localStorage.getItem('x-session-token') || ''
            },
        });
        return { status, data, ok: true, headers: respHeader };
    } catch (err) {
        const { response: { status = 500 } = {} } = err;
        if (status === 401) {
            localStorage.clear();
            window.location.reload();
        } else {
            return { ok: false, status };
        }
    }
};

export const getVisitorsContactHandler = (filter = {}) => {
    return axiosInstance({
        method: 'get',
        url: 'contact',
        params: { ...filter }
    });
};

export const addNewDonationHandler = (payload = {}) => {
    return axiosInstance({
        method: 'post',
        url: 'admin/donation',
        data: { ...payload }
    });
};

export const updateDonationHandler = ({ id, ...restParams } = {}) => {
    return axiosInstance({
        method: 'patch',
        url: 'admin/donation',
        data: { ...restParams },
        params: { id }
    });
};

export const deleteDonationHandler = ( id ) => {
    return axiosInstance({
        method: 'delete',
        url: 'admin/donation',
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
        url: 'admin/user',
        data: { ...payload }
    });
};

export const updateAdminUserHandler = ( payload, { email = '' } ) => {
    return axiosInstance({
        method: 'patch',
        url: 'admin/user',
        data: { ...payload },
        params: { email }
    });
};

export const fetchOrgUserHandler = () => {
    return axiosInstance({
        method: 'get',
        url: 'admin/user'
    });
};

export const resetOrgUserPasswordHandler = (email) => {
    return axiosInstance({
        method: 'post',
        url: '/admin/reset-password',
        data: { email }
    });
};

export const deleteOrgUserHandler = (email) => {
    return axiosInstance({
        method: 'delete',
        url: '/admin/user',
        params: { email }
    });
};

export const setAdminPasswordHandler = ({ password, token }) => {
    return axiosInstance({
        method: 'patch',
        url: '/set-password',
        data: { password },
        headers: { 'x-key': token }
    });
};

export const changeContactStatusHandler = ({ id }) => {
    return axiosInstance({
        method: 'patch',
        url: 'admin/contact',
        params: { id }
    })
};

export const deleteContactHandler = ({ id }) => {
    return axiosInstance({
        method: 'delete',
        url: 'admin/contact',
        params: { id }
    });
};

export const fetchMetaDetailsForAdmin = async () => {
    return axiosInstance({
        method: 'get',
        url: 'page-meta',
        params: { language: 'english', fullResponse: true }
    });
}