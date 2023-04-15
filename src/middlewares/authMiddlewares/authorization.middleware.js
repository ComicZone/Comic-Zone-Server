class Authorize {
    authorizeAdmin(req, res, next){
        if (req.user.role !== "admin") {
            return res.status(403)
                .send({
                    success: false, 
                    message: "Only an admin can make this request"
                })
        }
        next();
    }
}
module.exports = new Authorize();