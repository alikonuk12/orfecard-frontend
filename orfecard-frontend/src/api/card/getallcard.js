import axios from 'axios';
import { BASE_URL } from '../constant';

const getallcard = async (limit = 10, page = 1) => {
    try {
        const config = {
            baseURL: BASE_URL,
            withCredentials: true,
            url: `/api/card?limit=${limit}&page=${page}`,
            method: 'GET'
        };

        const { status, data } = (await axios(config))?.data;

        if (status !== 'success') return;
        return data;
    } catch (e) {
        console.log(e);
    }
}

export default getallcard;