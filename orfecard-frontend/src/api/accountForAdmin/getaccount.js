import axios from 'axios';
import { BASE_URL } from '../constant';

const getaccount = async (id) => {
    try {
        const config = {
            baseURL: BASE_URL,
            withCredentials: true,
            url: `/api/account/admin/${id}`,
            method: 'GET'
        };

        const { status, data } = (await axios(config))?.data;

        if (status !== 'success') return;
        return data;
    } catch (e) {
        console.log(e);
    }
}

export default getaccount;