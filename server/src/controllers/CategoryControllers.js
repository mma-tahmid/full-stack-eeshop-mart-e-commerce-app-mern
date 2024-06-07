

// Create Category

const categoryModel = require("../models/categoryModel")
var slugify = require('slugify')

exports.CreateCategory = async (req, res) => {

    try {

        const { categoryName } = req.body

        if (!categoryName) {
            return res.status(401).send({ message: "Category Name is Required" })
        }

        const existingCategory = await categoryModel.findOne({ categoryName })

        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Same name Category alreay Exists"
            })
        }

        const category = await new categoryModel({

            categoryName,
            slug: slugify(categoryName)

        }).save()


        res.status(201).send({
            success: true,
            message: "New Category created Succcessfully",
            category
        })
    }

    catch (error) {

        //console.log(error)

        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"

        })
        // if (error.code === 11000) {
        //     res.status(400).json({ error: 'Duplicate category detected' });
        // } else {
        //     res.status(500).json({ error: 'Internal Server Error' });
        // }


    }

}

// Update Category

exports.UpdateCategory = async (req, res) => {

    try {

        const { categoryName } = req.body;
        const { categoryId } = req.params;

        const updateCategory = await categoryModel.findByIdAndUpdate(categoryId, { categoryName, slug: slugify(categoryName) }, { new: true })

        res.status(200).send({
            success: true,
            message: "Category updated Successfully",
            updateCategory
        })

    }

    catch (error) {
        //console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error While updating Category"

        })
    }

}

// Get All Category

exports.GetAllCategory = async (req, res) => {

    try {

        const getAllCategory = await categoryModel.find({})


        res.status(200).send({
            success: true,
            message: "All Categories List",
            output: getAllCategory
        })

    }

    catch (error) {
        //console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error While Getting All Category"

        })
    }
}

exports.GetSingleCategory = async (req, res) => {

    try {

        const { slugs } = req.params

        const getSingleCategory = await categoryModel.findOne({ slug: slugs }) // this slug come from database model 


        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            output: getSingleCategory
        })

    }

    catch (error) {
        //console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error While Getting Single Category"

        })
    }
}


// Delete Category

exports.DeleteCategory = async (req, res) => {

    try {

        // const { categoryid } = req.params
        const categoriedId = req.params.categoryid

        const deleteCategory = await categoryModel.findByIdAndDelete(categoriedId)

        res.status(200).send({
            success: true,
            message: "Category Deleted  Successfully",

        })

    }

    catch (error) {
        //console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error While Delete Category"

        })
    }

}