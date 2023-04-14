class BaseService {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await new this.model(data)
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate({_id: id}, data, { new: true })
    }

    async delete(id) {
        return await this.model.findByIdAndDelete({_id: id})
    }

    async find(filter) {
        return await this.model.findOne(filter)
    }

    async findWithSpecificFields(filter, fields) {
        return await this.model.findOne(filter, fields)
    }

    async findAll(filter) {
        return await this.model.find(filter)
    }

    async findAllWithSpecificFields(filter, fields) {
        return await this.model.find(filter, fields)
    }
}

module.exports = BaseService;