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


module.exports = router;
