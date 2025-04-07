import axios from "axios";

/// FETCHER GET
export const fetcherGet = (url: string) => axios.get(url).then(res => res.data)

/// FETCHER
export const fetcher= async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);
  
    if (!response.ok) {
      // const errorMessage = `Error: ${response.status} ${response.statusText}`;
      // throw new Error(errorMessage);
    }

    return response.json();
  };




