import { formatDate } from "@/app/ulti/ulti";
import { callDeleteRequest, callGetRequest, callPostRequest } from "./apiService";
import { FeaturesForResponse } from '../types/features/FeaturesForResponse';
import { FeaturesForPost } from "../types/features/FeaturesForPost";

export type FeaturesForCard = {
    id: string;
    name: string;
    thumbnailFileName: string;
    url: string;
    created_at: string;
    updated_at: string;
}

export async function getAllFeature(): Promise<Array<FeaturesForCard> | undefined>{
    const result = await callGetRequest(`/feature`);
    const data: Array<FeaturesForCard> = result.response;
    if(result.status === 200) {
        const res: Array<FeaturesForCard> = [];
        for (const item of data) {
            res.push({
                id: item.id,
                name: item.name,
                thumbnailFileName: item.thumbnailFileName,
                url: item.url,
                created_at: formatDate(item.created_at,"DD/MM/YYYY HH:mm"),
                updated_at: formatDate(item.updated_at,"DD/MM/YYYY HH:mm"),
            })
        }
        return res;
    }
}

  
  export async function postFeature(body: FeaturesForPost): Promise<FeaturesForCard | undefined> {
    const result = await callPostRequest('/feature', body);
    const data: FeaturesForResponse = result.response;
    if (result.status === 201) {
      return {
        id: data.id,
        name: data.name,
        thumbnailFileName: data.thumbnailFileName,
        url: data.url,
        created_at: formatDate(data.created_at,"DD/MM/YYYY HH:mm"),
        updated_at: formatDate(data.updated_at,"DD/MM/YYYY HH:mm"),

    }
  }
    }
  
  export async function deleteFeature(idRole: string): Promise<boolean | undefined> {
    try {
      const result = await callDeleteRequest(`/feature/${idRole}`);
      if (result.status === 200) {
        return true
      }
    } catch (error) {
      console.error(error)
    }
}