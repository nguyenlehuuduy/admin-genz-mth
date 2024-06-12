import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { TabMenuForCreate } from '../types/tab-menu/TabMenuForCreate';
import { TabMenuForResponse } from '../types/tab-menu/TabMenuForResponse';
import { formatDate } from '../../ulti/ulti';

export type TabMenuForCard = {
    id: string;
    name: string;
    iconUrl: string;
    url: string;
    created_at: string;
    updated_at: string;
};

export async function getAllTabMenu(): Promise<Array<TabMenuForCard> | undefined> {
    const result = await callGetRequest(`/tab-menu`);
    const data: Array<TabMenuForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<TabMenuForCard> = [];
        for (const item of data) {
            res.push({
                id: item.id,
                name: item.name,
                iconUrl: item.iconUrl,
                url: item.url,
                created_at: formatDate(item.created_at, 'DD/MM/YYYY HH:mm'),
                updated_at: formatDate(item.updated_at, 'DD/MM/YYYY HH:mm')
            });
        }
        return res;
    }
}

export async function tabMenuCreate(body: TabMenuForCreate): Promise<TabMenuForCard | undefined> {
    const result = await callPostRequest('/tab-menu', body);
    const data: TabMenuForResponse = result.response;
    if (result.status === 201) {
        return {
            id: data.id,
            name: data.name,
            iconUrl: data.iconUrl,
            url: data.url,
            created_at: formatDate(data.created_at, 'DD/MM/YYYY HH:mm'),
            updated_at: formatDate(data.updated_at, 'DD/MM/YYYY HH:mm')
        };
    }
}

export async function deleteTabMenu(idTabMenu: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/tab-menu/${idTabMenu}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
