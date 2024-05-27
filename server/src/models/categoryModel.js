const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
    {
        
        categoryName: { type: String, required: true, unique: true },
        slug: { type: String, lowercase: true }

    },

    { timestamps: true, versionKey: false }
);

// model
const categoryModels = mongoose.model("category", categorySchema);
module.exports = categoryModels;