import { UserForResponse } from '../account/UserForResponse';
import { PaginationAndFilter } from '../pagination/pagination';
import { ImagePostForResponse } from './ImagePostForResponse';

export type PostForResponse = {
  id: string;
  contentText: string;
  accountId: string;
  account: UserForResponse;
  created_at: Date | string;
  updated_at: Date | string;
  totalReaction: number;
  totalComment: number;
  totalShare: number;
  images?: Array<ImagePostForResponse>;
  is_liked?: boolean;
  comment_recent?: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    content: string;
  }>;
};

export type PostForDetailResponse = {
  id: string;
  contentText: string;
  accountId: string;
  account: UserForResponse;
  created_at: Date | string;
  updated_at: Date | string;
  totalReaction: number;
  totalComment: number;
  totalShare: number;
  images?: Array<ImagePostForResponse>;
  is_liked?: boolean;
  comment_recent?: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    content: string;
  }>;
  all_share_info?: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    updated_at: string;
  }>;
  all_like_info?: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    updated_at: string;
  }>;
  all_comment?: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    updated_at: string;
    content: string;
  }>;
};

export type PostForFullResponse = {
  data: Array<PostForResponse>;
  pagination: PaginationAndFilter;
};
