import axios from 'axios';
import { getTokenFromLocalStorage } from '../utility/userUtils';
const API_BASE_URL = 'http://127.0.0.1:5000/api/users';

axios.defaults.withCredentials = true;
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials);
        if (response.statusText !== 'OK') {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        const errorMsg = err.response.data.error;
        throw new Error(errorMsg || 'An unknown error occurred');
    }
}


export const logoutUser = async (credentials) => {
    try {
        const token = getTokenFromLocalStorage('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }
        const response = await axios.get(`${API_BASE_URL}/logout`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.statusText !== 'OK') {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        return { error: true, message: err.message || 'An unknown error occurred' };
    }
}

export const currentUser = async () => {
    try {
        const token = getTokenFromLocalStorage('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }
        const response = await axios.get(`${API_BASE_URL}/current_user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.statusText !== 'OK') {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        return { error: true, message: err.message || 'An unknown error occurred' };
    }
}

export const singleUser = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`)
        if (response.statusText !== 'OK') {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const registerUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, credentials);
        console.log(response);
        if (response.statusText !== 'Created') {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        const errorMsg = err.response.data.error;
        return { error: true, message: errorMsg || 'An unknown error occurred' };
    }
}

export const fetchUsersFromServer = async (query = {}) => {
    try {
        const params = query;
        const token = getTokenFromLocalStorage('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.get(`${API_BASE_URL}`, {headers, params});
        if (response.statusText !== 'OK') {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        throw err;
    }
}

export const updateUserRole = async (id, newRole) => {
        try {
        const token = getTokenFromLocalStorage('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.put(`${API_BASE_URL}/update_role?userId=${id}&newRole=${newRole}`, {}, {headers});
        if (response.statusText !== 'OK') {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        throw err
    }
}
