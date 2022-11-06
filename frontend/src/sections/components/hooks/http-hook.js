import { useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {

    //prevent updating state that is not on a screen anymore if page gets changed while fetching
    const activeHttpRequests = useRef([]);

    //useCallback so it never get recreated or infinite loops
    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {


        //behind the scenes managing
        const httpAbortController = new AbortController ();
        activeHttpRequests.current.push(httpAbortController);

        try{
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortController.signal
            });

            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortController);

            if(!response.ok){
                throw new Error(responseData.message);
            }

            return responseData;
        }catch (err){

            throw err;
        }
    }, []);


    useEffect (() => {
        //cleanup function & unmounting
        return () => {

            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return {sendRequest};
};