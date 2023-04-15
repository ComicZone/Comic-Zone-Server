const {Schema, model} = require('mongoose');

// Define the schema for categories
const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

// Create a model for categories
const categoryModel = model('Category', categorySchema);

module.exports = categoryModel;