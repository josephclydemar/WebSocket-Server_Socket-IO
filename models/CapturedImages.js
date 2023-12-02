
import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const capturedImagesSchema = new Schema(
    {
        b64_encoded_image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


export default mongoose.model('captured_images', capturedImagesSchema);