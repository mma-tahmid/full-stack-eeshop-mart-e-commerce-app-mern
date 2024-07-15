import React, { useEffect, useState } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast';



const useCategory = () => {

    const [categories, setCategories] = useState([])

    const getCategories = async () => {

        try {
            const response = await axios.get("/api/v3/category/get-all-category")
            if (response.data.success) {
                setCategories(response?.data.output) // output comes from backend
                //console.log(response.data.output)
            }

        }

        catch (error) {
            //console.log(error);
            toast.error("Something went wrong")

        }
    }

    useEffect(() => {
        getCategories()
    }, [])





    return categories
};

export default useCategory; 