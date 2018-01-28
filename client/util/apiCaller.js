/* globals process */
import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

export const API_URL = `${Config.baseUrl}/api`;

export default function callApi({route, method = 'get', body, fullUrl}) {
    return fetch(fullUrl ? fullUrl : `${API_URL}/${route}`, {
        headers: { 'content-type': 'application/json' },
        method,
        body: JSON.stringify(body),
    })
        .then(response => response.json().then(json => ({ json, response })))
        .then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }

            return json;
        })
        .then(
            response => response,
            error => error
        );
}

