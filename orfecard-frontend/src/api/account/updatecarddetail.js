import axios from 'axios';
import { BASE_URL } from '../constant';

const updatecarddetail = async (body) => {
    try {
        const config = {
            baseURL: BASE_URL,
            withCredentials: true,
            url: '/api/account/updatecarddetail',
            method: 'PUT',
            data: body
        };

        const { status } = (await axios(config))?.data;

        if (status !== 'success') return;
        return true;
    } catch (e) {
        console.log(e);
    }
}

export default updatecarddetail;