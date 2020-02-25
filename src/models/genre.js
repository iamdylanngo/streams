import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    title: String,
    order: Number,
}, 
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

GenreSchema.plugin(mongoosePaginate);

export default mongoose.model('genres', GenreSchema);