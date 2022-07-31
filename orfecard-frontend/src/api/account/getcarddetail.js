import axios from 'axios';
import { BASE_URL } from '../constant';

const getcarddetail = async (body) => {
    try {
        const config = {
            baseURL: BASE_URL,
            withCredentials: true,
            url: '/api/account/getcarddetail',
            method: 'POST',
            data: body
        };

        const { status, data } = (await axios(config))?.data;

        if (status !== 'success') return;
        return data;
    } catch (e) {
        console.log(e);
    }
}

export default getcarddetail;