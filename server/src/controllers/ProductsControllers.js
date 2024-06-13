

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

        //console.log(error)

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

        //console.log(error)
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
            output: getAllProducts,

        })
    }

    catch (error) {

        //console.log(error)
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

        const { slugss } = req.params;
        // const { productSlug } = req.params.slugss
        // const productSlug = req.params.slugss

        const singleProduct = await productsModel.findOne({ slug: slugss }).select("-photo").populate("categorys");

        res.status(201).send({
            success: true,
            message: "Single Products Fetched",
            output: singleProduct,
        })
    }

    catch (error) {

        //console.log(error) 
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

        //console.log(error)

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

        //console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error While Deleting Product",
            error: error.message

        })

    }

}


// filter Product

exports.ProductsFilter = async (req, res) => {

    try {

        const { checked, radio } = req.body

        let args = {}
        if (checked.length > 0) args.categorys = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }

        const filterProducts = await productsModel.find(args)
        res.status(201).send({
            success: true,
            message: "Products Filter Successfully",
            output: filterProducts

        })



    }

    catch (error) {

        //console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while Filtering Products",
            error
        })
    }

}


// Products Count Controller

exports.ProductsCount = async (req, res) => {

    try {

        const total = await productsModel.find({}).estimatedDocumentCount()
        res.status(201).send({
            success: true,
            output: total

        })

    }

    catch (error) {
        res.status(400).send({
            success: false,
            message: "Error while Filtering Products",
            error
        })
    }

}


// Product List based on page
exports.ProductsListBasedOnPage = async (req, res) => {

    try {

        const perPage = 6;
        const pages = req.params.page ? req.params.page : 1
        const productss = await productsModel.find({}).select("-photo").skip((pages - 1) * perPage).limit(perPage).sort({ createdAt: -1 })

        res.status(201).send({
            success: true,
            output: productss

        })

    }

    catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in per page",
            error
        })
    }
}

// product search 


exports.SearchProduct = async (req, res) => {

    try {

        const keyWords = req.params.keywords

        const results = await productsModel.find({
            $or: [
                { productName: { $regex: keyWords, $options: "i" } },// i means ----> Case insenstivity
                { description: { $regex: keyWords, $options: "i" } }
            ]
        }).select("-photo")

        res.status(201).send({
            success: true,
            output: results

        })

    }

    catch (error) {

        res.status(400).send({
            success: false,
            message: "Error in Search Product",
            error
        })
    }

}


// Similar Product

exports.SimilarProduct = async (req, res) => {

    try {

        const { productId, categoryId } = req.params

        const similarProduct = await productsModel.find({
            categorys: categoryId,
            _id: { $ne: productId }, // not include it ($ne is a function) 
        }).select("-photo").limit(4).populate("categorys") // Populate according to Category

        res.status(201).send({
            success: true,
            output: similarProduct

        })
    }

    catch (error) {

        // console.log(error)

        res.status(400).send({
            success: false,
            message: "Error while getting Similar Product",
            error
        })
    }


}