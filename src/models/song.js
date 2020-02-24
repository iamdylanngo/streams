import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: String,
    artistId: String,
    categoryId: String,
    userId: String,
    length: String,
    musicPath: String,
    imagePath: String,
}, 
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

SongSchema.plugin(mongoosePaginate);

export default mongoose.model('tracks', SongSchema);