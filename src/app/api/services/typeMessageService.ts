import { TypeMessageForResponse } from '../types/typemessage/TypeMessageForResponse';
import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { TypeMessageForCreate } from '../types/typemessage/TypeMessageForCreate';
import { formatDate } from '../../ulti/ulti';
export type TypeMessageForCard = {
    id: string;
    name_Type_Message: string;
    description_Type_Message: string;
    created_at: string;
    updated_at: string;
};
export async function getAllTypeMessage(): Promise<Array<TypeMessageForCard> | undefined> {
    const result = await callGetRequest(`/type-message`);
    const data: Array<TypeMessageForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<TypeMessageForCard> = [];
        for (const item of data) {
            res.push({
                id: item.id,
                name_Type_Message: item.nameTypeMessage,
                description_Type_Message: item.descriptionTypeMessage,
                created_at: formatDate(item.created_at, 'DD/MM/YYYY HH:mm'),
                updated_at: formatDate(item.updated_at, 'DD/MM/YYYY HH:mm')
            });
        }
        return res;
    }
}

export async function postTypeMessage(body: TypeMessageForCreate): Promise<TypeMessageForCard | undefined> {
    const result = await callPostRequest('/type-message', body);
    const data: TypeMessageForResponse = result.response;
    if (result.status === 201) {
        return {
            id: data.id,
            name_Type_Message: data.nameTypeMessage,
            description_Type_Message: data.descriptionTypeMessage,
            created_at: formatDate(data.created_at, 'DD/MM/YYYY HH:mm'),
            updated_at: formatDate(data.updated_at, 'DD/MM/YYYY HH:mm')
        };
    }
}

export async function deleteTypeMessage(idTabMenu: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/type-message/${idTabMenu}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
