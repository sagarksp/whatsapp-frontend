// lib/api.js
import { fetcher } from "./api";
const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json') 
      ? await response.json() 
      : await response.text();
  
    if (!response.ok) {
      const error = (data && data?.message) || response?.statusText;
      throw new Error(error);
    }
  
    return data;
  };
  
  export const fetchOutbox = async (page = 1, limit = 10) => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/message-tracker?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await handleResponse(response);
    } catch (error) {
      throw new Error(`Failed to fetch outbox: ${error.message}`);
    }
  };
  
  export const deleteOutboxItem = async (id) => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/message-tracker/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await handleResponse(response);
    } catch (error) {
      throw new Error(`Failed to delete item: ${error.message}`);
    }
  };
  
  export const getOutboxItem = async (id) => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/message-tracker/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await handleResponse(response);
    } catch (error) {
      throw new Error(`Failed to fetch item: ${error.message}`);
    }
  };