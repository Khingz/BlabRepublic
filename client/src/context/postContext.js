import { createContext, useContext, useState, useEffect } from "react";
import { fetchPostsFromServer, newPost } from "../services/post.api";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (query = {}) => {
        try {
          setIsLoading(true)
          const data = await fetchPostsFromServer(query);
          setPosts(data.data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
    };

    const addPost = async (credentials) => {
      try {
        setIsLoading(true);
        const data = await newPost(credentials);
        if (data.error) {
          throw new Error(data.message);
        }
        setIsLoading(false);
      } catch(err) {
        setIsLoading(false);
        throw new Error(err.message)
      }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <PostContext.Provider value={{ posts, isLoading, fetchData, setIsLoading, addPost }}>
          {children}
        </PostContext.Provider>
    );
}

export function usePost () {
    return useContext(PostContext);
}