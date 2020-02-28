import mongoose from 'mongoose';

export const connectMongoDB = () => {
    mongoose.connect(
        `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        console.log("Connected to mongodb");
    }).catch((err) => {
        console.log(err);
    });
}