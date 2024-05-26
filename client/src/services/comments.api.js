import axios from 'axios';
import { getTokenFromLocalStorage } from '../utility/userUtils';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const fetchCommentsFromServer = async (postID) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments/${postID}/comments`);
        if (response.statusText !== 'OK') {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        throw err;
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
        if (response.statusText !== 'OK') {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch (err) {
        throw (err);
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
        if (response.statusText !== 'OK') {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch(err) {
        throw err;
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
        if (response.statusText !== 'OK') {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch(err) {
        throw err;
    }
}

export const fetchSingleComment = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments/${id}`);
        if (response.statusText !== 'OK') {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response;
    } catch(err) {
        throw err;
    }
}