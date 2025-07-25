import { toast } from 'sonner';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

import apiCallServer from './apiCallServer';


interface ApiResponse<T = any> {
  msg: string;
  data?: T;
  user?: T; // For login/register responses
  token?: string; // For login/register responses
}

const apiCall = async <T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T | null> => {
  try {
    const { data: resData, error } = await apiCallServer(method, url, data, config, true);
    if(!resData) {
      throw error
    }
    if(resData && resData.msg) {
      toast.success(resData.msg);
    }
    return resData
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse<T>>;
      if (axiosError.response) {
        const { status, data: errorData } = axiosError.response;

        if (status === 401) {
          toast.error(errorData?.msg || 'Session expired. Please log in again.');
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
          }
        } else {
          toast.error(errorData?.msg || 'An error occurred.');
        }
        throw axiosError.response
      } else {
        toast.error('Network error or server unreachable.');
      }
    } else {
      toast.error('An unexpected error occurred.');
    }
    return null;
  }
};

export default apiCall;

// Helper functions for specific HTTP methods
export const get = <T = any>(url: string, config?: AxiosRequestConfig) =>
  apiCall<T>('GET', url, undefined, config);
export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
  apiCall<T>('POST', url, data, config);
export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
  apiCall<T>('PUT', url, data, config);
export const del = <T = any>(url: string, config?: AxiosRequestConfig) =>
  apiCall<T>('DELETE', url, undefined, config);