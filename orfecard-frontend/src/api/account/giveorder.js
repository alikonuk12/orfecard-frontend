import axios from 'axios';
import { BASE_URL } from '../constant';

const giveorder = async (body) => {
    try {
        const config = {
            baseURL: BASE_URL,
            withCredentials: true,
            url: '/api/account/giveorder',
            method: 'POST',
            data: body
        };

        const { status, data } = (await axios(config))?.data;

        return { status, data };       
    } catch (e) {
        console.log(e);
    }
}

export default giveorder;