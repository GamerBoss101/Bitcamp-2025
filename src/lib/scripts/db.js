import mongoose from "mongoose";


class DB {

	constructor() {
        this.connect();
        
    }

	connect() {
		if (!process.env.DATABASE_URL) {
			throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
		}
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.DATABASE_URL).then(() => { console.log("Connected to DataBase") });
    }  

}

export const db = new DB();