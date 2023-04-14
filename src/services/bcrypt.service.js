const bcrypt = require('bcrypt');
const rounds = parseFloat(process.env.ROUNDS)

const hashPassword = async (passwordInput) => {
    return await bcrypt.hash(passwordInput, rounds)
}
const verifyPassword = async (passwordInput, hashedPassword) => {
    return await bcrypt.compare(passwordInput, hashedPassword)
}

module.exports = { hashPassword, verifyPassword }