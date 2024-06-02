const express = require("express");

const { CheckNormalUser, CheckAdmin } = require("../middlewares/authMiddleware");

const categoryControllers = require("../controllers/CategoryControllers");

const router = express.Router();


router.post("/create-category", CheckNormalUser, CheckAdmin, categoryControllers.CreateCategory)

// update category
router.put("/update-category/:categoryId", CheckNormalUser, CheckAdmin, categoryControllers.UpdateCategory);

// get all category
router.get("/get-all-category", categoryControllers.GetAllCategory);

// get Single Category
router.get("/get-single-category/:slugs", categoryControllers.GetSingleCategory);

// delete category
router.delete("/delete-category/:categoryid", CheckNormalUser, CheckAdmin, categoryControllers.DeleteCategory);



module.exports = router;