const {model, Schema, Types} = require('mongoose');

const ComicBookSchema = new Schema({
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
        type: Date,
        required: true,
    },
    price: {
        type: Number,
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

const ComicBook = model("comicBook", ComicBookSchema);
module.exports = ComicBook;