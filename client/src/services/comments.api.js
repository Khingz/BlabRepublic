import axios from 'axios';
import { getTokenFromLocalStorage } from '../utility/userUtils';

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api`;

axios.defaults.withCredentials = true;

export const fetchCommentsFromServer = async (postID) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments/${postID}/comments`);
        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        const errorMsg = err.response.data.error;
        return { error: true, message: errorMsg || 'An unknown error occurred' };
    }
}

export const newComment= async (postID, credentials) => {
    try {
        const token = getTokenFromLocalStorage('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.post(`${API_BASE_URL}/comments/${postID}/new`, credentials, {headers});
        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        const errorMsg = err.response.data.error;
        return { error: true, message: errorMsg || 'An unknown error occurred' };
    }
}

export const likeCommentItem = async (id) => {
    try {
        const token = getTokenFromLocalStorage('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.put(`${API_BASE_URL}/comments/${id}/like`, {}, {headers});
        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch(err) {
        const errorMsg = err.response.data.error;
        return { error: true, message: errorMsg || 'An unknown error occurred' };
    }
}

export const unLikeCommentItem = async (id) => {
    try {
        const token = getTokenFromLocalStorage('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.delete(`${API_BASE_URL}/comments/${id}/unlike`, {headers});
        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch(err) {
        const errorMsg = err.response.data.error;
        return { error: true, message: errorMsg || 'An unknown error occurred' };
    }
}

export const fetchSingleComment = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments/${id}`);
        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch(err) {
        const errorMsg = err.response.data.error;
        return { error: true, message: errorMsg || 'An unknown error occurred' };
    }
}