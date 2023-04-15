const {model, Schema, Types} = require('mongoose');

const ComicSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "category",
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    releaseDate: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Comic = model("comic", ComicSchema);
module.exports = Comic;