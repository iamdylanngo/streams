import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    name: String,
    rules: { type: Number, default: 0 },
    imagePath: String,
}, 
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

UserSchema.plugin(mongoosePaginate);

export default mongoose.model('users', UserSchema);