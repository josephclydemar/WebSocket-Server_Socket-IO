import CapturedImagesModel from '../models/CapturedImages.js';

async function saveNewCapturedImage(data) {
    const savedCapturedImage = await CapturedImagesModel.create({
        b64_encoded_image: data
    });
    return savedCapturedImage;
}

export { saveNewCapturedImage };