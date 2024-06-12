import { PermissionPostForPost } from "../types/permission-post/PermissionPostForCreate";
import { PermissionPostForResponse } from "../types/permission-post/PermissionPostForResponse";
import { callDeleteRequest, callGetRequest, callPostRequest } from "./apiService";


export type PermissionPostForCard = {
  id: string;
  code: string;
  description: string;
}

export async function getAllPermissionPost(): Promise<Array<PermissionPostForCard> | undefined> {
  const result = await callGetRequest(`/permission-post`);
  const data: Array<PermissionPostForResponse> = result.response;
  if (result.status === 200) {
    const res: Array<PermissionPostForCard> = [];
    for (const item of data) {
      res.push({
        id: item.id,
        code: item.code,
        description: item.description,
      })
    }
    return res;
  }
}

export async function postPermissionPost(body: PermissionPostForPost): Promise<PermissionPostForCard | undefined> {
  const result = await callPostRequest('/permission-post', body);
  const data: PermissionPostForResponse = result.response;
  if (result.status === 201) {
    return {
      id: data.id,
      code: data.code,
      description: data.description,
    };
  }
}

export async function deletePermissionPost(idPermissionPost: string): Promise<boolean | undefined> {
  try {
    const result = await callDeleteRequest(`/permission-post/${idPermissionPost}`);
    if (result.status === 200) {
      return true
    }
  } catch (error) {
    console.error(error)
  }

}