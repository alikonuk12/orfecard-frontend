import axios from 'axios';
import { BASE_URL } from '../constant';

const putaccount = async (id, body) => {
    try {
        const config = {
            baseURL: BASE_URL,
            withCredentials: true,
            url: `/api/account/admin/${id}`,
            method: 'PUT',
            data: body
        };

        const { status, data } = (await axios(config))?.data;

        if (status !== 'success') return;
        return data;
    } catch (e) {
        console.log(e);
    }
}

export default putaccount;