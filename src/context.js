// An example of goods being delivered from warehouse to you when ordered online via Amazon
// context (warehouse)
// Provider (delivery boy/girl)
// Consumer / (useContext() or YOU)

import React, {useContext, useEffect, useState} from 'react';

const AppContext = React.createContext();

const API_URL = `https://imdb-api.com/API/AdvancedSearch/${process.env.REACT_APP_API_KEY}`
// used it for security purposes so that no one else can use my api key 
// as this api lets me call 100 times a day as a free user.

const AppProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: "false", msg:"" });
    const [query, setQuery] = useState("avengers");



    const getMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

            if (data.results) {
                setIsLoading(false);
                setIsError({
                    show: false,
                    msg: null
                });
                
                setMovie(data.results);
            } else {
                setIsError({
                    show: true,
                    msg: data.errorMessage
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    //debouncing being used here since I want only 1 API response per second

    useEffect(()=> {
        let timerOut = setTimeout(()=> {
            getMovies(`${API_URL}?title=${query}&has=plot`);
        }, 500);

        return () => clearTimeout(timerOut); 
    }, [query]);// a clean up function being used to achieve our goal alongside setTimeout.

    // above useEffect re-renders our component each time the search query is changed. 





    return <AppContext.Provider value = {{ isLoading, isError, movie, query, setQuery }}>
        {children}
    </AppContext.Provider>
};

//custom global hook

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };


