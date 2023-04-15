const Comic = require('../models/comic.model');

class ComicService {

    //create comic
    async create(comic) {
        const _comic = await Comic.create(comic);
        return await Comic.findOne({ _id: _comic.id}, "-__v -fileUrl");
    }

    //get a comic by name
    async getComic(name) {
        return await Comic.findOne({name: name, isDeleted: false}, "-V -fileUrl -isDeleted");
    }

    //get comics
    async getAllComics(filter) {
        filter.isDeleted = false;
        //sorts in descending order based on the date created
        return await Comic.find(filter, "-__v -fileUrl -isDeleted").sort({ createdAt: 'desc' });
    }

    //get a comic by an id
    async getById(id) {
        return await Comic.findOne({id: id, isDeleted: false}, "-__v -fileUrl -isDeleted");
    }

    //edit room details with id
    async editById(id, obj) {
        if(await Comic.findOne({ _id: id, isDeleted: false })){
            return await Comic.findByIdAndUpdate(id, { $set: obj }, { new: true }).select("-__v -fileUrl -isDeleted");
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