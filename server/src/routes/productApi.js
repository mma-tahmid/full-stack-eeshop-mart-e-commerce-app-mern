const express = require("express");


const productsController = require("../controllers/ProductsControllers");
const { CheckNormalUser, CheckAdmin } = require("../middlewares/authMiddleware");

const formidableMiddleware = require('express-formidable');

const router = express.Router();


router.post("/create-product", CheckNormalUser, CheckAdmin, formidableMiddleware(), productsController.CreateProduct);

router.get("/get-all-products", productsController.GetAllProducts);

router.get("/get-single-products/:slugss", productsController.GetSingleProducts);

// get photo
router.get("/get-product-photo/:productId", productsController.ProductPhotoController);

router.delete("/delete-product/:productseId", productsController.DeleteProduct);

router.put("/update-product/:productseId", CheckNormalUser, CheckAdmin, formidableMiddleware(), productsController.UpdateProducts);

// filter Product

router.post("/product-filters", productsController.ProductsFilter)

// product Count 
router.get("/product-count", productsController.ProductsCount);

// Product Per Page
router.get("/product-listts/:page", productsController.ProductsListBasedOnPage);

// Search Product

router.get("/search-product/:keywords", productsController.SearchProduct);

// Similar Product
router.get("/similar-product/:productId/:categoryId", productsController.SimilarProduct);

// Category Wise Product
router.get("/category-wise-product/:sluges", productsController.CategoryWiseProduct);

module.exports = router;
