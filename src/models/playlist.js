import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    title: String,
    userId: String,
    songs: [String],
    imagePath: String 
}, 
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

PlaylistSchema.plugin(mongoosePaginate);

export default mongoose.model('genres', PlaylistSchema);