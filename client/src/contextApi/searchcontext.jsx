import { createContext, useContext, useEffect, useState } from "react";


const SearchContext = createContext()



// Normal State ka Global State ka convert korar jonno AuthProvider 

const SearchProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        keyword: "",
        results: []
    });



    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {/* auth & setAuth ka sobgaijai use korte parbo */}

            {children}

        </SearchContext.Provider>
    )

}

//Create Custom Hook

const useSearch = () => useContext(SearchContext)

export { useSearch, SearchProvider }