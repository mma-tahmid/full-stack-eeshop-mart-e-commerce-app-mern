const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {

        productName: { type: String, required: true },
        slug: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        categorys: {
            // type: mongoose.Schema.Types.ObjectId,
            type: mongoose.ObjectId,
            ref: "category", // link to category Model
            required: true
        },

        quantity: { type: Number, required: true },
        photo: { data: Buffer, contentType: String },
        shipping: { type: Boolean }
        // Boolean






    },

    { timestamps: true, versionKey: false }
);

// model
const productModels = mongoose.model("product", productSchema);
module.exports = productModels;