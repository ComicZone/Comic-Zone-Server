const {category} = require("../services/create.service");

class categoryController {

  //create category
    async addCategory(req, res) {
      const body = req.body;
      const name = body.name;

      //check to see if a category with name exists
      const exsistingCategory = await category.find({name: body.name.toLowerCase()});

      //sends an error if the name exists
      if(exsistingCategory) {
        return res.status(404)
          .send({
            success: false,
            message: "Name already exists"
          });
      }

      //create a category if the name doesn't exist
      const createdCategory = await category.create({name});
      createdCategory.save();
      return res.status(201)
        .send({
            message: "category created successfully",
            success: true,
            data: createdCategory
        });
  }

  //get all categories
  async getCategories(req, res) {
    const categories = await category.findAll({});
    res.status(201)
      .send({
        message: "Categories fetched successfully",
        success: true,
        data: categories
      });
  }

  //get a category
  async getCategoryById(req, res) {
      const id = req.params.id;
      const _category = await category.find({_id: id});
  
      if (!(_category)) {
        return res.status(404).send({
          success: false,
          message: "Id inputted doesn't exist"
        });
      }

      res.status(200).send({
        success: true,
        message: "Category fetched successfully",
        data: category
      });
  }
}

module.exports = new categoryController();