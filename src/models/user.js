import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    nickname: String,
    rules: { type: Number, default: 0 },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

UserSchema.plugin(mongoosePaginate);

export default mongoose.model('users', UserSchema);