import mongoose from 'mongoose';

export const connectMongoDB = () => {
    mongoose.connect(
        `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`,
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