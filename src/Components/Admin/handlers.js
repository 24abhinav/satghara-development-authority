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
            }
        });
        return { status, data, ok: true };
    } catch (err) {
        return { ok: false };
    }
};
