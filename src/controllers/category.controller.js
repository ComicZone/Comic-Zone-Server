const category = require("../services/create.service");
const { hashPassword, verifyPassword } = require("../services/bcrypt.service");

class categoryController {

    // create category
    async createCategory (req, res) {
        const categoryName = req.body;

    const existingCategory = await category.find({ _id: id, deleted: false });

    // Sends a message if the specified category does not exist
    if (!existingcategory) {
      return res.status(404).json({
        message: `This category does not exist`,
        success: false,
      });
    }}

  // Updating a category
  async updatecategory(req, res) {
    try {
      const { romance, adult, fiction, scifi, action, lifestyle, planet, imagination } = req.body;
      const id = req.params.id;
      const reqcategoryId = req.category.id;

      // Checks if category already exists
      

      if (reqcategoryId !== existingcategory?._id.toString())
        return res.status(403).json({
          message: `You cannot update this category`,
          success: false,
        });

      let updatedcategory;
      updatedcategory = await category.update(id, data);
      updatedcategory = await category.findWithSpecificFields(
        { _id: updatedcategory._id },
        "-password -deleted -cart -catalog -downloaded"
      );

      // Sends a success message and displays the updated category
      const message = {};

      // Sends a success message and displays the updated category
      if (data.fullname) message.fullname = `Updated successfully!`;

      if (data.email) message.email = `Updated successfully!`;

      if (data.phoneNumber) message.phoneNumber = `Updated successfully!`;

      if (data.password) message.password = `Changed successfully!`;

      return res.status(200).json({
        message: message,
        data: updatedcategory,
        success: true,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        success: false,
      });
    }
  }

  // Deleting a category
  async deletecategory(req, res) {
    try {
      const id = req.params.id;
      const reqcategoryId = req.category.id;

      const existingcategory = await category.find({ _id: id, deleted: false });

      // Sends a message if the specified category does not exist
      if (!existingcategory)
        return res.status(404).json({
          message: `This category does not exist`,
          success: false,
        });

      if (
        req.category.role !== "admin" &&
        reqcategoryId !== existingcategory._id.toString()
      )
        return res.status(403).json({
          message: `You cannot delete this category`,
          success: false,
        });

      // This soft deletes a category
      existingcategory.deleted = true;
      await existingcategory.save();

      const deletedcategory = await category.findWithSpecificFields(
        { _id: existingcategory._id },
        "-password -deleted -cart -catalog -downloaded"
      );

      // Sends a success message and displays the deleted category
      return res.status(200).json({
        message: `category deleted successfully!`,
        success: true,
        data: deletedcategory,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        success: false,
      });
    }
  }

  // Getting a category by id
  async getcategory(req, res) {
    try {
      let id = req.params.id;
      const existingcategory = await category.find({ _id: id, deleted: false });

      // Sends a message if the specified category does not exist
      if (!existingcategory)
        return res.status(404).json({
          message: `This category does not exist`,
          success: false,
        });

      // Sends a success message and displays category
      return res.status(200).json({
        message: `category fetched successfully!`,
        success: true,
        data: existingcategory,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        success: false,
      });
    }
  }

  // Getting all categories
  async getcategorys(req, res) {
    try {
      const categorys = await category.findAll({ deleted: false });

      // Sends a message if no categories exist
      if (!categorys)
        return res.status(404).json({
          message: `Oops, it seems like there are no categorys yet`,
          success: false,
        });

      // Sends a success message and displays categorys
      return res.status(200).json({
        message: `categorys fetched successfully!`,
        success: true,
        data: categorys,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        success: false,
      });
    }
  }
}

module.exports = new categoryController();