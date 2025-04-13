import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true,
};

const postSchema = new mongoose.Schema({
    imageDes: reqString,
    timeStamp: Date,
    reactions: Array,
});

export class Pickup {
    model: mongoose.Model<any>;
    upsert: any;
    constructor() {
        this.model = mongoose.model('post', postSchema);
        this.upsert = { upsert: true };
    }
    async create(imageDes: string, reactions: Array<any>) {
        const newEntry = new this.model({
            imageDes: imageDes,
            timeStamp: new Date().toISOString(),
            reactions: reactions,
        });
        await newEntry.save();
        return newEntry;
    }
}