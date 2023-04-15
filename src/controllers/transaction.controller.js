
// Packages

// const { transaction, user } = require('../services/create.service')

// confirm payment status
// module.exports.confirmPayment = async function (req, res, next) {
//     const { paymentReference } = req.body;

//     if (paymentReference) {
//         const reader = await user.find({ _id: req.user.id })
//         const newTransaction = await transaction.create({ userId: reader._id, reference: paymentReference });

//         const [cartItems] = await reader.cart;
//         const paidItems = await 
//         next();
//     }
//     else return res.status(400).json({ success: false, message: 'Purchase failed' });

// }