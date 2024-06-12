import { callDeleteRequest, callGetRequest, callPostRequest } from "./apiService";
import { HotContentForResponse } from "../types/hotcontent/hotcontentForResponse";
import { HotContentForPost } from "../types/hotcontent/hotcontentForPost";

export type HotContentForCard = {
  id: string;
  title: string;
  url: string;
  thumbnailFileName: string;
}

export async function getAllHotContent(): Promise<Array<HotContentForCard> | undefined> {
  const result = await callGetRequest(`/hot-content`);
  const data: Array<HotContentForResponse> = result.response;
  if (result.status === 200) {
    const res: Array<HotContentForCard> = [];
    for (const item of data) {
      res.push({
        thumbnailFileName: item.thumbnailFileName,
        id: item.id,
        title: item.title,
        url: item.url,
      })
    }
    return res;
  }
}

export async function postHotContent(body: HotContentForPost): Promise<HotContentForCard | undefined> {
  const result = await callPostRequest('/hot-content', body);
  const data: HotContentForResponse = result.response;
  if (result.status === 201) {
    return {
      id: data.id,
      thumbnailFileName: data.thumbnailFileName,
      title: data.title,
      url: data.url,
    };
  }
}

export async function deleteHotContent(idHotContent: string): Promise<boolean | undefined> {
  try {
    const result = await callDeleteRequest(`/hot-content/${idHotContent}`);
    if (result.status === 200) {
      return true
    }
  } catch (error) {
    console.error(error)
  }

}