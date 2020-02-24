import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    title: String,
    id: Number,
}, 
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

TypeSchema.plugin(mongoosePaginate);

export default mongoose.model('types', TypeSchema);