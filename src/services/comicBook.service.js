const Comic = require('../models/comic.model');

export default class ComicService {

    //create comic
    async createComic(comic) {
        return await Comic.create(comic);
    }

    //get a comic by an id
    async getComic(id) {
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
