const { model, Schema} = require('mongoose')
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
    fullname:{
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        max: 11
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    cart: {
        type: ObjectId,
        ref: 'Cart'
    },
    catalog: [{
        type: ObjectId,
        ref: 'Comics'
    }],
    downloaded: [{
        type: ObjectId,
        ref: 'Comics'
    }],
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User = model('User', userSchema)
module.exports = User;