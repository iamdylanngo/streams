import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: String,
    artist: String,
    genreId: [String],
    userId: String,
    length: String,
    musicPath: String,
    imagePath: String,
    public: Boolean
}, 
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

SongSchema.plugin(mongoosePaginate);

export default mongoose.model('songs', SongSchema);