import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true,
}

const reqNumber = {
    type: Number,
    required: true,
}

const reqBoolean = {
    type: Boolean,
    required: true,
}

const userSchema = new mongoose.Schema({
    email: reqString,
    username: reqString,
    points: reqNumber,
    owned: reqBoolean,
    inventory : Array,
    imageDescription: reqString,
    ButtonsOptions: Array
});12

export class User {
  model: mongoose.Model<any>;
  upsert: any;
  constructor() {
      this.model = mongoose.model('user', userSchema);
      this.upsert = { upsert: true };
  }
  async create(id: string, pickupLine: string, followUpLine: string, ButtonsOptions: Array<any>, colors: any, image: any, password: string) {
      const newEntry = new this.model({
          id: id,
          pickupLine: pickupLine,
          followUpLine: followUpLine,
          ButtonsOptions: ButtonsOptions,
          colors: colors,
          image: image,
          date: new Date().toISOString(),
          password: password,
      });
      await newEntry.save();
      return newEntry;
  }
}