const Comic = require('../models/comic.model');

class ComicService {

    //create comic
    async create(comic) {
        return await Comic.create(comic);
    }

    //get a comic name
    async getComic(name) {
        return await Comic.findOne({name: name, isDeleted: false}, V);
    }

    //get comics
    async getAllComics() {
        let filter = {};
        filter.isDeleted = false;
        //sorts in descending order based on the date created
        return await User.find(filter, "-__v -password").sort({ createdAt: 'desc' });
    }

    //get a comic by an id
    async getById(id) {
        return await Comic.findOne({id: id, isDeleted: false}, V);
    }

    //edit room details with id
    async editById(id, obj) {
        if(await Comic.findOne({ _id: id, isDeleted: false })){
            return await Comic.findByIdAndUpdate(id, { $set: obj }, { new: true });
        }    
    }

    //delete comic by id
    async deleteById(id) {
        return await Comic.updateOne(
            { _id: id, isDeleted: false }, 
            {isDeleted: true}
        );
    }
}

module.exports = new ComicService();