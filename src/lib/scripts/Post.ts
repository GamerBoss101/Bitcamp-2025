import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true,
};

const postSchema = new mongoose.Schema({
    id: reqString,
    imageDes: reqString,
    timeStamp: Date,
    reactions: Array,
    userId: reqString,
});

export class Post {
    model: mongoose.Model<any>;
    upsert: any;
    constructor() {
        this.model = mongoose.model('posts', postSchema);
        this.upsert = { upsert: true };
    }

    makeId(length: number) {
        var result = [];
        var characters = 'abcdefghijklmnopqrstuvwxyz012345678901234567890123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        return result.join('');
    }

    async create(userId:string, imageDes: string) {
        const newEntry = new this.model({
            id: this.makeId(5),
            imageDes: imageDes,
            timeStamp: new Date().toISOString(),
            reactions: [],
            userId: userId
        });
        await newEntry.save();
        return newEntry;
    }

    async getById(id: string) {
        return await this.model.findOne({ id: id });
    }

    async getAll() {
        return await this.model.find({});
    }

    async getAllByUserId(userId: string) {
        return await this.model.find({ userId: userId });
    }

    async update(id: string, imageDes: string) {
        return await this.model.updateOne({ id: id }, { imageDes: imageDes });
    }

    async delete(id: string) {
        return await this.model.deleteOne({ id: id });
    }
}

export default Post;