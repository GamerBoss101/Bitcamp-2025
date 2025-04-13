import mongoose from "mongoose";

import User from "./User";  
import Post from "./Post";

class DB {
    users: User;
    posts: Post;
	constructor() {
        this.users = new User();
        this.posts = new Post();
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