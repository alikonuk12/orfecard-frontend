import axios from 'axios';
import { BASE_URL } from '../constant';

const addtocontact = async ({ profileId, link }) => {
    try {
        const config = {
            baseURL: BASE_URL,
            withCredentials: true,
            url: `/api/account/addtocontact/${profileId}`,
            method: 'POST',
            data: { link }
        };

        const { status, data } = (await axios(config))?.data;

        if (status !== 'success') return;
        return data;
    } catch (e) {
        console.log(e);
    }
}

export default addtocontact;