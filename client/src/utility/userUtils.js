import { singleUser } from "../services/auth.api";

export const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('accessToken', token);
}

export const deleteTokenFromLocalStorage = () => {
    localStorage.removeItem('accessToken');
}

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken');
}

export const getSingleUser = async (id) => {
    try {
        const data = await singleUser(id);
        if (!data) {
            throw new Error('Error fetching user')
        }
        return {success: true, data};
    } catch (err) {
        return {succces: false}
    }
}