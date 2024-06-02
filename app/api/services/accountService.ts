import { callGetRequest } from './apiService';
import { AccountSearchForResponse } from '../types/account/AccountSearchForResponse';

export type AccountSearchForCard = {
  id: string
  full_name: string;
  about_me: string;
  nick_name: string;
  address: string;
  avata: string;
};

export async function searchAccount(query: string): Promise<Array<AccountSearchForCard> | undefined> {
  const result = await callGetRequest(`/search/accounts-by-admin?${query}`);
  const data: Array<AccountSearchForResponse> = result.response;
  if (result.status === 200) {
    const res: Array<AccountSearchForCard> = [];
    for (const item of data) {
      res.push({
        id: item.id,
        about_me: item.aboutMe,
        address: item.address,
        avata: item.avata,
        full_name: item.fullName,
        nick_name: item.nickName
      });
    }
    return res;
  }
}

