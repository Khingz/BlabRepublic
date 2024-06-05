import axios from 'axios';
import { getTokenFromLocalStorage } from '../utility/userUtils';

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api`;

export const fetchPostsFromServer = async (query = {}) => {
    try {
        const params = query;
        const response = await axios.get(`${API_BASE_URL}/posts/`, { params });
        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        const errorMsg = err.response.data.error;
        return { error: true, message: errorMsg || 'An unknown error occurred' };
    }
}

export const fetchSinglePost = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch(err) {
        const errorMsg = err.response.data.error;
        return { error: true, message: errorMsg || 'An unknown error occurred' };
    }
}

export const newPost= async (credentials) => {
    try {
        const token = getTokenFromLocalStorage('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.post(`${API_BASE_URL}/posts/new`, credentials, {headers});
        if (response.status !== 201) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        const errorMsg = err.response.data.error;
        return { error: true, message: errorMsg || 'An unknown error occurred' };
    }
}


export const updatePostItem= async (credentials, id) => {
    try {
        const token = getTokenFromLocalStorage('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.put(`${API_BASE_URL}/posts/${id}`, credentials, {headers});
        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        const errorMsg = err.data.error;
        return { error: true, message: errorMsg || 'An unknown error occurred' };
    }
}

export const deletePostItem= async (id) => {
    try {
        const token = getTokenFromLocalStorage('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.delete(`${API_BASE_URL}/posts/${id}`, {headers});
        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        const errorMsg = err.response.data.error;
        return { error: true, message: errorMsg || 'An unknown error occurred' };
    }
}

export const likePostItem = async (id) => {
    try {
        const token = getTokenFromLocalStorage('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.put(`${API_BASE_URL}/posts/${id}/like`, {}, {headers});
        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch(err) {
        const errorMsg = err.response.data.error;
        return { error: true, message: errorMsg || 'An unknown error occurred' };
    }
}

export const unLikePostItem = async (id) => {
    try {
        const token = getTokenFromLocalStorage('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.delete(`${API_BASE_URL}/posts/${id}/unlike`, {headers});
        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch(err) {
        const errorMsg = err.response.data.error;
        return { error: true, message: errorMsg || 'An unknown error occurred' };
    }
}