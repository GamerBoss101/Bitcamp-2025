import mongoose from "mongoose";

const reqString = {
	type: String,
	required: true,
};

const userSchema = new mongoose.Schema({
	id: reqString,
	email: reqString,
	username: reqString,
    avatar: String,
	points: Number,
	inventory: Array,
	friends: Array<String>,
	requests: Array<String>,
});

export class User {
	model: mongoose.Model<any>;
	upsert: any;
	constructor() {
		this.model = mongoose.model("users", userSchema);
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

	async create(
		email: string,
		username: string
	) {
        const id = this.makeId(5);
		const newEntry = new this.model({
            id: id,
			email: email,
			username: username,
            avatar: null,
            points: 0,
            inventory: [],
            friends: [],
            requests: []
		});

		await newEntry.save();
		return newEntry;
	}

    async findById(id: string) {
        return await this.model.findOne({ id: id });
    }

    async findByEmail(email: string) {
        return await this.model.findOne({ email: email });
    }

    async findByUsername(username: string) {
        return await this.model.findOne({ username: username });
    }

    async update(Id: string, data: any) {
        return await this.model.updateOne({ id: Id }, { $set: data }, this.upsert);
    }

    async delete(Id: string) {
        return await this.model.deleteOne({ id: Id });
    }

    async getAll() {
        return await this.model.find({});
    }
}

export default User;
