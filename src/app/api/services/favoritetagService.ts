import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { FavoriteTagForPost } from '../types/favorite-tag/FavoriteTagForPost';
import { FavoriteTagForResponse } from '../types/favorite-tag/FavoriteTagForResponse';
import { formatDate } from '../../ulti/ulti';

export type FavoriteTagForCard = {
    id: string;
    nameFavorite: string;
    descriptionFavorite: string;
    created_at: string;
    updated_at: string;
};

export async function getAllFavoriteTag(): Promise<Array<FavoriteTagForCard> | undefined> {
    const result = await callGetRequest(`/favorite-tag`);
    const data: Array<FavoriteTagForCard> = result.response;
    if (result.status === 200) {
        const res: Array<FavoriteTagForCard> = [];
        for (const item of data) {
            res.push({
                id: item.id,
                nameFavorite: item.nameFavorite,
                descriptionFavorite: item.descriptionFavorite,
                created_at: formatDate(item.created_at, 'DD/MM/YYYY HH:mm'),
                updated_at: formatDate(item.updated_at, 'DD/MM/YYYY HH:mm')
            });
        }
        return res;
    }
}

export async function postFavoriteTag(body: FavoriteTagForPost): Promise<FavoriteTagForCard | undefined> {
    const result = await callPostRequest(`/favorite-tag`, body);
    const data: FavoriteTagForResponse = result.response;
    if (result.status === 201) {
        return {
            id: data.id,
            nameFavorite: data.nameFavorite,
            descriptionFavorite: data.descriptionFavorite,
            created_at: formatDate(data.created_at, 'DD/MM/YYY HH:mm'),
            updated_at: formatDate(data.updated_at, 'DD/MM/YYYY HH:mm')
        };
    }
}

export async function deleteFavoriteTag(idFavoriteTag: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/favorite-tag/${idFavoriteTag}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
