const {create, getById, getComic, getAllComics, editById, deleteById} = require("../services/comic.service");
const isObjectId = require("../utils/isValidObjectId.util");
const {category} = require("../services/create.service");

class Controller {

    //create comic
    async addComic(req, res) {
        const body = req.body;
        //check to see if a comic with same name exists
        const existingComic = await getComic({name: body.name});
        //sends an error if the name exists
        if(existingComic) {
            return res.status(409)
            .send({
                message: "Name already exists",
                success: false
            });
        }

        //validates the categoryId
        const {categoryId} = body;
        // const _category = await category.find({ _id: categoryId, deleted: false });
        // if (!(_category)) {
        //     return res.status(404).send({
        //     success: false,
        //     message: "CategoryId doesn't exist"
        //     });
        // }
        //checks if the Id passed in is a valid Id
        if(!isObjectId(categoryId)){
            return res.status(404).send({
                success: false,
                message: "CategoryId is not a valid objectId"
            });
        }

        //create a comic if the name doesn't exist and categoryId is valid
        const comic = await create(req.body);
        return res.status(201)
            .send({
                success: true,
                message: "Comic created successfully",
                data: comic
            });
    }

    //get by Id
    async getComic(req, res) {
        const id = req.params.id;
        //checks if the Id passed in is a valid Id
        if(!isObjectId(id)){
            return res.status(404).send({
                success: false,
                message: "Id entered is not a valid object Id"
            });
        }
        //check if comic exists
        const comic = await getById(id);
        if (!comic) {
            return res.status(404).send({
                success: false,
                message: "Id doesn't exist"
            });
        }
        return res.status(200).send({
            success: true,
            message: "Comic fetched successfully",
            data: comic
        });
    }

    //get comics
    async getComics(req, res) {
        const comics = await getAllComics({});
        return res.status(200).send({
            success: true,
            message: "All comics fetched successfully",
            returnedPosts: comics
        });
    }

    //get comics by categories
    async getByCategoryId(req, res) {
        const id = req.params.id;
        const category = await find({_id: id});
    
        if (!category) {
            return res.status(404).send({
            success: false,
            message: "Id inputted doesn't exist"
            });
        }

        let filter = {
            categoryId: id
        }
        const comics = await getAllComics(filter);
        return res.status(200).send({
            success: true,
            message: "All comics fetched successfully",
            returnedPosts: comics
        });
    }

    //edit comics
    async editComic(req, res) {
        const id = req.params.id;
        const data = req.body;
        // Fetch the comic with the id
        const existingComic = await getById(id);
        if(!existingComic) {
            return res.status(404).json({
            message: "Id inputted doesn't exist",
            success: false
        })}
        // Fetching comic name from existing comic
        if(data.name){
            const existingComicWithName  = await getComic(data.name.toLowerCase())
            if(existingComicWithName){
                if(existingComicWithName._id.toString() !== id){
                    return res.status(403).json({
                        success: false,
                        message: "Name already exists"
                    })
                }
            }
        }
        const updatedComic = await editById(id, data)
        return res.status(200).json({
            success: true,
            message: "Comic updated successfully",
            data: updatedComic
        })
    }

    //delete comics
    async deleteComic(req, res) {
        const {id} = req.params;
        //checks if the Id passed in is a valid Id
        if(!isObjectId(id)){
            //sends an error if the id doesn't exists
            return res.status(404).send({
                success: false,
                message: "Invalid Id"
            });
        }
        //deletes the comic if the id exist
        const comicDeleted = await deleteById(id);
            if(comicDeleted) {
                return res.status(201).send({
                    success: true,
                    message: "Comic deleted successfully"
                });
            }
    }
}

module.exports = new Controller();