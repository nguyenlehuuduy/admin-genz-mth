import { formatDate } from '@/app/ulti/ulti';
import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { TypeImageForResponse } from '../types/type-image/TypeImageForResponse';
import { TypeImageForCreate } from '../types/type-image/TypeImageForCreate';

export type TypeImageForCard = {
    id: string;
    typeImageName: string;
    created_at: string;
    updated_at: string;
};

export async function getAllTypeImage(): Promise<Array<TypeImageForCard> | undefined> {
    const result = await callGetRequest(`/type-image`);
    const data: Array<TypeImageForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<TypeImageForCard> = [];
        for (const item of data) {
            res.push({
                id: item.id,
                typeImageName: item.typeImageName,
                created_at: formatDate(item.created_at, 'DD/MM/YYYY HH:mm'),
                updated_at: formatDate(item.updated_at, 'DD/MM/YYYY HH:mm')
            });
        }
        return res;
    }
}

export async function typeImageCreate(body: TypeImageForCreate): Promise<TypeImageForCard | undefined> {
    const result = await callPostRequest('/type-image', body);
    const data: TypeImageForResponse = result.response;
    if (result.status === 201) {
        return {
            id: data.id,
            typeImageName: data.typeImageName,
            created_at: formatDate(data.created_at, 'DD/MM/YYYY HH:mm'),
            updated_at: formatDate(data.updated_at, 'DD/MM/YYYY HH:mm')
        };
    }
}

export async function deleteTypeImage(idTypeImage: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/type-image/${idTypeImage}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
