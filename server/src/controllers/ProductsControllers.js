

var fs = require('fs');
const productsModel = require('../models/productModel');
const { default: slugify } = require('slugify');

// Create New Product

exports.CreateProduct = async (req, res) => {

    try {

        const { productName, slug, description, price, categorys, quantity, shipping } = req.fields; // contains non-file fields

        const { photo } = req.files; // contains files

        // Validation
        switch (true) {
            case !productName:
                return res.status(500).send({ error: "Name is Required" })
            case !description:
                return res.status(500).send({ error: "Description is Required" })
            case !price:
                return res.status(500).send({ error: "Price is Required" })
            case !categorys:
                return res.status(500).send({ error: "category is Required" })
            case !quantity:
                return res.status(500).send({ error: "quantity is Required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is Required and should be less than 1MB" })
        }

        const createProduct = new productsModel({ ...req.fields, slug: slugify(productName) })
        if (photo) {
            createProduct.photo.data = fs.readFileSync(photo.path)
            createProduct.photo.contentType = photo.type
        }

        await createProduct.save()

        res.status(201).send({
            success: true,
            message: "New Product created Succcessfully",
            createProduct
        })
    }

    catch (error) {

        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Creating Product"

        })

    }

}


// Update Product
exports.UpdateProducts = async (req, res) => {
    try {

        const { productName, slug, description, price, categorys, quantity, shipping } = req.fields; // contains non-file fields

        const { photo } = req.files; // contains files

        // Validation
        switch (true) {
            case !productName:
                return res.status(500).send({ error: "Name is Required" })
            case !description:
                return res.status(500).send({ error: "Description is Required" })
            case !price:
                return res.status(500).send({ error: "Price is Required" })
            case !categorys:
                return res.status(500).send({ error: "category is Required" })
            case !quantity:
                return res.status(500).send({ error: "quantity is Required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is Required and should be less than 1MB" })
        }

        const ProductsId = req.params.productseId

        const updateProduct = await productsModel.findByIdAndUpdate(ProductsId, { ...req.fields, slug: slugify(productName) }, { new: true })

        if (photo) {
            updateProduct.photo.data = fs.readFileSync(photo.path)
            updateProduct.photo.contentType = photo.type
        }

        await updateProduct.save()

        res.status(201).send({
            success: true,
            message: " Product Updated Succcessfully",
            updateProduct
        })
    }

    catch (error) {

        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error While Updating Product",
            error: error.message

        })

    }

}





// Get All Products

exports.GetAllProducts = async (req, res) => {

    try {

        const getAllProducts = await productsModel.find({}).populate("categorys").select("-photo").limit(15).sort({ createdAt: -1 })

        // "-photo" means -----> photo does not show 
        res.status(201).send({
            success: true,
            countTotalProducts: getAllProducts.length,
            message: "All Products",
            getAllProducts,

        })
    }

    catch (error) {

        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Getting all Products",
            error: error.message

        })

    }

}

// Get Single Products
exports.GetSingleProducts = async (req, res) => {

    try {

        const { productSlug } = req.params.slugss

        const singleProduct = await productsModel.findOne({ productSlug }).select("-photo").populate("categorys");

        res.status(201).send({
            success: true,
            message: "Single Products Fetched",
            singleProduct,

        })
    }

    catch (error) {

        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error While Getting Single Products",
            error: error.message

        })

    }

}

// Get Photo

exports.ProductPhotoController = async (req, res) => {

    try {

        const productsIds = req.params.productId

        const productPhoto = await productsModel.findById(productsIds).select("photo")

        if (productPhoto.photo.data) {

            res.set("Content-type", productPhoto.photo.contentType)
            return res.status(200).send(productPhoto.photo.data)
        }


    }

    catch (error) {

        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error While Getting Products Photo",
            error: error.message

        })

    }

}

// Delete Product 
exports.DeleteProduct = async (req, res) => {

    try {

        const productssId = req.params.productseId
        deleteProducts = await productsModel.findByIdAndDelete(productssId).select("-photo")


        res.status(201).send({
            success: true,
            message: "Products Deleted  Successfully",


        })


    }

    catch (error) {

        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error While Deleting Product",
            error: error.message

        })

    }

}


