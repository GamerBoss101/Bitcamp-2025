import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true,
}

const userSchema = new mongoose.Schema({
    email: reqString,
    username: reqString,
    points: Number,
    inventory : Array,
    id: reqString,
    friends: Array,
    requests: Array,
})

export class User {
  model: mongoose.Model<any>;
  upsert: any;
  constructor() {
      this.model = mongoose.model('user', userSchema);
      this.upsert = { upsert: true };
  }
  async create(email: string, username: string, points: number, inventory: Array<any>, id: string, friends: Array<any>, requests: Array<any>) {
      const newEntry = new this.model({
          email: email,
          username: username,
          points: points,
          inventory: inventory,
          id: id,
          friends: friends,
          requests: requests,
          
      });
      await newEntry.save();
      return newEntry;
  }
}