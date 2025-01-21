import { eventEmitter } from 'shared/helpers/eventEmitter.js';
import axios from 'axios';

class UrlBuilder {
    static baseUrl = 'https://test.vmarmysh.com/';
    static async doRequest(config) {
        try {
            const response = await axios(config);
            return response.data;
        } catch (e) {
            eventEmitter.emit('api:Error', e.response.data.data);
            return { ...e.response.data.data, error: true };
        }
    }

    static buildQuery(params) {
        return Object.entries(params).join('&').replace(/,/g, '=');
    }
}

export default UrlBuilder;
