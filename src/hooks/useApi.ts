import { useCallback } from 'react';
import { toast } from 'sonner';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import apiCallServer from '../lib/apiCallServer';
import { useAuth } from '@/context/AuthContext';

interface ApiResponse<T = any> {
  msg: string;
  data?: T;
  user?: T;
  token?: string;
}

interface UseApiOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  handleAuth?: boolean;
}

export const useApi = (options: UseApiOptions = {}) => {
  const { 
    showSuccessToast = true, 
    showErrorToast = true, 
    handleAuth = true 
  } = options;
  
  const { setUser, setShowAuth, logout } = useAuth();

  const apiCall = useCallback(async <T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    localOptions?: UseApiOptions
  ): Promise<T | null> => {
    const mergedOptions = { ...options, ...localOptions };
    
    try {
      const { data: resData, error } = await apiCallServer(method, url, data, config, true);
      
      if (!resData) {
        throw error;
      }
      
      // Handle success message
      if (resData?.msg && mergedOptions.showSuccessToast) {
        toast.success(resData.msg);
      }
      
      // Auto-update user data if present
      if (resData?.user && handleAuth) {
        setUser(resData.user);
      }
      
      return resData;
      
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse<T>>;
        
        if (axiosError.response) {
          const { status, data: errorData } = axiosError.response;

          if (status === 401 && mergedOptions.handleAuth) {
            // Handle authentication error
            if (mergedOptions.showErrorToast) {
              toast.error(errorData?.msg || 'Session expired. Please log in again.');
            }
            
            logout();
            setShowAuth(true);
            
          } else if (mergedOptions.showErrorToast) {
            toast.error(errorData?.msg || 'An error occurred.');
          }
          
          throw axiosError.response;
        } else if (mergedOptions.showErrorToast) {
          toast.error('Network error or server unreachable.');
        }
      } else if (mergedOptions.showErrorToast) {
        toast.error('An unexpected error occurred.');
      }
      
      return null;
    }
  }, [setUser, setShowAuth, logout, showSuccessToast, showErrorToast, handleAuth]);

  // Helper methods
  const get = useCallback(<T = any>(
    url: string, 
    config?: AxiosRequestConfig,
    localOptions?: UseApiOptions
  ) => apiCall<T>('GET', url, undefined, config, localOptions), [apiCall]);

  const post = useCallback(<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig,
    localOptions?: UseApiOptions
  ) => apiCall<T>('POST', url, data, config, localOptions), [apiCall]);

  const put = useCallback(<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig,
    localOptions?: UseApiOptions
  ) => apiCall<T>('PUT', url, data, config, localOptions), [apiCall]);

  const del = useCallback(<T = any>(
    url: string, 
    config?: AxiosRequestConfig,
    localOptions?: UseApiOptions
  ) => apiCall<T>('DELETE', url, undefined, config, localOptions), [apiCall]);

  return {
    apiCall,
    get,
    post,
    put,
    del
  };
};

// Specialized hooks for common patterns
export const useAuthApi = () => {
  return useApi({ handleAuth: true });
};

export const useSilentApi = () => {
  return useApi({ 
    showSuccessToast: false, 
    showErrorToast: false 
  });
};