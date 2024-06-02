import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout';
import AdminMenu from '../../Components/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios'
import { Modal } from 'antd';
import CategoryForm from '../../Components/Form/CategoryForm';

const AdminCreateCategoryPage = () => {

    // state for getting all category
    const [categories, setCategories] = useState([])

    // state for input field (CategoryForm.jsx) database property name= input field state name  
    const [categoryName, setCategoryName] = useState([])

    // state for Modal
    const [visibles, setVisibles] = useState(false)

    const [selected, setSelected] = useState(null)

    const [updateCategoryName, setUpdateCategoryName] = useState("")

    const handleSubmit = async (event) => {

        event.preventDefault()

        try {

            const response = await axios.post("/api/v3/category/create-category", { categoryName })

            if (response.data.success) {

                toast.success(response.data.message, { position: "top-right" })
                setCategoryName("") // After click submit Button Input field will be clear
                //toast.success(`${categoryName} is Created`)
                fetchAllCategoryData() // update all category list 

            }
            else {
                toast.error(response.data.message)
            }


        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form ")

        }

    }

    // get All Categories

    const fetchAllCategoryData = async () => {

        try {
            const response = await axios.get("/api/v3/category/get-all-category")
            if (response.data.success) {
                setCategories(response.data.output) // output comes from backend
                //console.log(response.data.output)
            }

        }

        catch (error) {
            console.log(error);
            toast.error("Something went wrong")

        }

    }

    useEffect(() => {
        fetchAllCategoryData()

    }, [])



    // Update Category
    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`/api/v3/category/update-category/${selected._id}`, { categoryName: updateCategoryName })

            if (response.data.success) {

                toast.success(response.data.message, { position: "top-right" })
                setSelected(null)
                setUpdateCategoryName("")
                setVisibles(false) // After click submit button modal will be gone
                fetchAllCategoryData() // update all category list 

            }
            else {
                toast.error(response.data.message)
            }

        }

        catch (error) {
            console.log(error);
            toast.error("Something went wrong")

        }

    }

    // Delete Category
    const handleDelete = async (cid) => {

        // cid = cid.trim();
        try {
            const response = await axios.delete(`/api/v3/category/delete-category/${cid}`)

            if (response.data.success) {

                toast.success(response.data.message, { position: "top-right" })

                fetchAllCategoryData() // update all category list 

            }
            else {
                toast.error(response.data.message)
            }

        }

        catch (error) {
            console.log(error);
            toast.error("Something went wrong")

        }

    }


    return (
        <>
            <Layout title={"Dashboard-Create Category"}>

                <div className="container m-3 p-3 ">
                    <div className="row">

                        <div className="col-md-3">
                            <AdminMenu />
                        </div>

                        <div className="col-md-9">

                            <h1> Manage Category </h1>

                            {/* Category form  */}

                            <div className="p-3 w-50">
                                <CategoryForm handleSubmits={handleSubmit} values={categoryName} setValues={setCategoryName} />
                            </div>

                            <div className='w-75'>
                                <table className="table">
                                    <thead>
                                        <tr>

                                            <th scope="col">Name</th>
                                            <th scope="col">Actions</th>
                                            <th></th>

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {
                                            categories?.map((singleCategory, i) => {

                                                return (
                                                    //key={index} means--> unique key row return row korbe
                                                    <tr key={i}>

                                                        <td>{singleCategory.categoryName} </td>

                                                        <td> <button className='btn btn-primary ms-1' onClick={() => {
                                                            setVisibles(true);
                                                            setUpdateCategoryName(singleCategory.categoryName);
                                                            setSelected(singleCategory);
                                                        }}> Edit </button> </td>

                                                        <td> <button className='btn btn-danger ms-1' onClick={() => {
                                                            handleDelete(singleCategory._id)
                                                        }}> Delete </button> </td>


                                                    </tr>
                                                )

                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <Modal onCancel={() => setVisibles(false)} footer={null} visible={visibles}>
                            <CategoryForm values={updateCategoryName} setValues={setUpdateCategoryName} handleSubmits={handleUpdate} />
                        </Modal>


                    </div>

                </div>
            </Layout>

        </>
    );
};

export default AdminCreateCategoryPage;