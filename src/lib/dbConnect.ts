import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) { // TypeScript complains here
        console.log("Already Connected");
        return;

    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "", {});
        console.log("db", db);

        connection.isConnected = db.connections[0].readyState
        console.log("db connections", db.connections);

        console.log("DB is connected");

    } catch (error) {
        console.log("DB is not connected");
        process.exit(1)

    }
}

export default dbConnect;