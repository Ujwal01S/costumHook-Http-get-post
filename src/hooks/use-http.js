import { useState, useCallback } from "react";

const useHttp= ()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
 

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url,
        {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      applyData(data); //i expect to get this function as a parameter to component-
      //the data is then passed to that component which is calling this custom hook-
      //so that it's data configuration can be done in that component i.e mailey movie ko lagi garya jastai props milauney

     

    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);
  //custom hooks can return anything arry, object,string,int etc
  return{
    // isLoading: isLoading,
    // error: error,
    // sendRequest: sendRequest

    //instead of above we can use mordern js shortcut

    isLoading,
    error,
    sendRequest,
  };

};

export default useHttp;