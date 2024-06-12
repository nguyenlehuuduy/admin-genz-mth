import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { TypeNotificationForResponse } from '../types/type-notification/TypeNotificationForResponse';
import { TypeNotificationForCreate } from '../types/type-notification/TypeNotificationForCreate';

export type TypeNotificationForCard = {
  id: string;
  type_name: string;
  description?: string;
  thumbnail_noti?: string;
};

export async function getAllTypeNotification(): Promise<Array<TypeNotificationForCard> | undefined> {
  const result = await callGetRequest(`/type-notification`);
  const data: Array<TypeNotificationForResponse> = result.response;
  if (result.status === 200) {
    const res: Array<TypeNotificationForCard> = [];
    for (const item of data) {
      res.push({
        id: item.id,
        type_name: item.typeName,
        description: item.description,
        thumbnail_noti: item.thumbnailNoti
      });
    }
    return res;
  }
}


export async function postTypeNotification(body: TypeNotificationForCreate): Promise<TypeNotificationForCard | undefined> {
  const result = await callPostRequest('/type-notification', body);
  const data: TypeNotificationForResponse = result.response;
  if (result.status === 201) {
    return {
      id: data.id,
      type_name: data.typeName,
      description: data.description,
      thumbnail_noti: data.thumbnailNoti
    };
  }
}


export async function deleteTypeNotification(idTypeImage: string): Promise<boolean | undefined> {
  try {
    const result = await callDeleteRequest(`/type-notification/${idTypeImage}`);
    if (result.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}
