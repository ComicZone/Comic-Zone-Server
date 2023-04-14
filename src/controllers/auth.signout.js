// Signs a registered user in and gives them access to protected content with a token
const logout = async (req, res) => {
    try {
        const token = '';

        // This saves the token as a cookie for the duration of its validity just to simulate how the request header works for the purpose of testing.
        await res.cookie("token", token, { httpOnly: true });

        // Sends success message on the console
        console.log(`User logged out successfully `);

        // Sends the token to the client side for it to be set as the request header using axios
        return res.status(200).json({
            success: true,
            token: token,
            message: `User succesfully logged out!`,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

module.exports = logout;