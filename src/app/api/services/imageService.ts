import { callPostRequest, submitMultiForm } from './apiService';

interface ImageForResponse {
    fieldname: string;
    originalname: string;
    size: string;
    filename: string;
    mimetype: string;
}

export type ImageForCard = {
    field_name: string;
    original_name: string;
    size: string;
    file_name: string;
    mime_type: string;
};

export type ImageForPost = {
    image: any;
};

export async function uploadImage(image: ImageForPost): Promise<ImageForCard | undefined> {
    const formData = new FormData();
    formData.append('image', image.image);
    const result = await submitMultiForm('/file/upload-posts', formData);
    const data: ImageForResponse = result.response;
    if (result.status === 201) {
        return {
            field_name: data.fieldname,
            file_name: data.filename,
            mime_type: data.mimetype,
            original_name: data.originalname,
            size: data.size
        };
    }
}
