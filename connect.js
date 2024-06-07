import mongoose from "mongoose";

async function ConnectMongoDb(url) {
    try {
        await mongoose.connect(url);
        console.log('Mongodb connected');
    } catch (error) {
        console.error('MongoErr:', error);
    }
}

export { ConnectMongoDb }