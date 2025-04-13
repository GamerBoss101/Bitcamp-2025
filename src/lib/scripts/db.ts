import mongoose from "mongoose";

import User from "./User";

class DB {
    users: User;
	constructor() {
        this.users = new User();
        this.connect();
    }

	connect() {
		if (!process.env.DATABASE_URL) {
			throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
		}
        mongoose.connect(process.env.DATABASE_URL).then(() => { console.log("Connected to DataBase") });
    }  
}

export const db = new DB();