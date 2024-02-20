import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Category name is unique"]
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Categories = mongoose.model("Categories", CategorySchema);

export default Categories;