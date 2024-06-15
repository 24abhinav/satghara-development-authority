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
        }
        return { ok: false, status };
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

export const fetchMetaDetailsHandler = async ( params = {} ) => {
    return axiosInstance({
        method: 'get',
        url: 'page-meta',
        params: { language: 'english', fullResponse: true, ...params }
    });
}

export const fetchAllMeta = async ( params = {} ) => {
    return axiosInstance({
        method: 'get',
        url: 'admin/page-meta',
    });
}

export const saveMetaDetailsHandler = async ( data ) => {
    return axiosInstance({
        method: 'post',
        url: '/admin/page-meta',
        data
    });
}

export const updateMetaStatueHandler = async ({ id, activeId }) => {
    return axiosInstance({
        method: 'patch',
        url: '/admin/page-meta-status',
        data: { id, activeId, status: true }
    });
}

export const deleteMetaHandler = async ({ id }) => {
    return axiosInstance({
        method: 'delete',
        url: `/admin/page-meta/${id}`
    });
}

export const getPrograms = async () => {
    return axiosInstance({
        method: 'get',
        url: '/programs',
    });
};

export const addNewProgramHandler = async (formData) => {
    return axiosInstance({
        method: 'post',
        url: '/admin/programs',
        data: formData
    });
};

export const editProgramHandler = async (formData, oldData) => {
    return axiosInstance({
        method: 'put',
        url: `/admin/programs`,
        data: { ...oldData, ...formData }
    });
};

export const deleteProgramHandler = async ({ id }) => {
    return axiosInstance({
        method: 'delete',
        url: `/admin/programs/${id}`
    });
};

export const addVideoHandler = async (data) => {
    return axiosInstance({
        method: 'post',
        url: `/admin/youtube-video`,
        data
    });
};

export const deleteVideoHandler = async ({ id }) => {
    return axiosInstance({
        method: 'delete',
        url: `/admin/youtube-video/${id}`
    });
};