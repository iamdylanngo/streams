import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: String,
    artists: String,
    user_id: String,
    path: String,
}, 
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

TrackSchema.plugin(mongoosePaginate);

export default mongoose.model('tracks', TrackSchema);