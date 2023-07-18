const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ConfigSchema = new Schema({
    show: {
        address: { type: Boolean, default: true },
        phone: { type: Boolean, default: true },
        friend_list: { type: Boolean, default: true }
    },
    follow_location: { type: Array, default: [] },
})

const OrderSchema = new Schema({
    userId: String,
    cart: { type: Array, default: [] }
})
//tạo bảng phác thảo để lấy api
const User = new Schema({
    name: { type: String, default: "Người dùng" },
    img: String,
    sex: { type: String, default: "noneSex" },
    birth: Number,
    email: String,
    phone: String,
    address: { type: String, default: null },
    credit_card: String,
    nickname: String,
    password: String,
    coin: { type: Number, default: 0 },
    cart: {
        payment: {
            discounted: { type: Number, default: 0}, 
            total: {type: Number, default: 0},
            preferential: { type: String, default: "NONE"},
            status: { type: Boolean, default: false}
        },
        order: []
    }
})

module.exports = mongoose.model('User', User, "user")
