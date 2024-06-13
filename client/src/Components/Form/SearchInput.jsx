import React, { useState } from 'react';
import { useSearch } from '../../contextApi/searchcontext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {

    const [searchValue, setSearchValue] = useSearch()

    const navigate = useNavigate()


    const handleFormSubmit = async (e) => {

        try {

            e.preventDefault()
            const response = await axios.get(`/api/v3/products/search-product/${searchValue.keyword}`)
            setSearchValue({ ...searchValue, results: response.data.output })
            navigate("/search")

        }

        catch (error) {
            console.log(error)
            error

        }

    }

    return (

        <>
            <form onSubmit={handleFormSubmit} className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                    value={searchValue.keyword}
                    onChange={(e) => setSearchValue({ ...searchValue, keyword: e.target.value })}
                />

                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

        </>
    );
};

export default SearchInput;