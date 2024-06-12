import { RoleForResponse } from '../types/role/roleForResponse';
import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { RoleForPost } from '../types/role/roleForPost';
import { formatDate } from '../../ulti/ulti';

export type RoleForCard = {
    id: string;
    name_role: string;
    description_role: string;
    created_at: string;
    updated_at: string;
};

export async function getAllRole(): Promise<Array<RoleForCard> | undefined> {
    const result = await callGetRequest(`/roles`);
    const data: Array<RoleForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<RoleForCard> = [];
        for (const item of data) {
            res.push({
                created_at: formatDate(item.created_at, 'DD/MM/YYYY HH:mm'),
                description_role: item.descriptionRole,
                id: item.id,
                name_role: item.nameRole,
                updated_at: formatDate(item.updated_at, 'DD/MM/YYYY HH:mm')
            });
        }
        return res;
    }
}

export async function postRole(body: RoleForPost): Promise<RoleForCard | undefined> {
    const result = await callPostRequest('/roles', body);
    const data: RoleForResponse = result.response;
    if (result.status === 201) {
        return {
            created_at: formatDate(data.created_at, 'DD/MM/YYYY HH:mm'),
            description_role: data.descriptionRole,
            id: data.id,
            name_role: data.nameRole,
            updated_at: formatDate(data.updated_at, 'DD/MM/YYYY HH:mm')
        };
    }
}

export async function deleteRole(idRole: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/roles/${idRole}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
