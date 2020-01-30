import mongoose, { Schema } from 'mongoose';

var schema =  new Schema({
    username: String,
    password: String,
    roles: [Number],
    nickname: String,
    active: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

var User = mongoose.model('User', schema);

export default User;