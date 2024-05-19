'use server';
import { formatDate, objectToQueryParams } from '@/app/ulti/ulti';
import { PostForQuery } from '../types/post/PostForQuery';
import { callGetRequest, callPostRequest } from './apiService';
import { PostForResponse } from '../types/post/PostForResponse';
import { PaginationAndFilter } from '../types/pagination/pagination';

export type PostForCard = {
    post_id: string;
    content_text: string;
    created_at: string;
    total_reaction: number;
    total_comment: number;
    total_share: number;
    image_post: Array<string>;
    account: {
        id: string;
        name: string;
        nick_name: string;
        avata: string;
    };
    is_like: boolean;
    comment_recent: Array<{
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

export async function getListPost(query: PostForQuery): Promise<
    | {
          data: PostForCard[];
          pagination: PaginationAndFilter;
      }
    | undefined
> {
    try {
        const res = await callGetRequest(`/post/admin/get-all-post?${objectToQueryParams(query)}`);
        if (res.status === 200) {
            const data: {
                data: PostForResponse[];
                pagination: PaginationAndFilter;
            } = res.response;
            const result: PostForCard[] = [];
            for (const post of data.data) {
                result.push({
                    account: {
                        id: post.account.id,
                        name: post.account.fullName,
                        nick_name: post.account.nickName,
                        avata: `${process.env.API_BASE_URL}${post.account.avata}`
                    },
                    content_text: post.contentText,
                    created_at: formatDate(String(post.created_at), 'DD/MM/YYYY'),
                    image_post: post?.images?.map((item) => `${process.env.API_BASE_URL}${item.path}`) ?? [],
                    is_like: !!post.is_liked,
                    post_id: post.id,
                    total_comment: post.totalComment,
                    total_reaction: post.totalReaction,
                    total_share: post.totalShare,
                    comment_recent: post.comment_recent ?? []
                });
            }
            return {
                data: result,
                pagination: data.pagination
            };
        }
    } catch (error) {
        console.error(error);
    }
}

export type PostForRequest = {
    contentText: string;
    imagePaths?: Array<string>;
};

export async function uploadPost(body: PostForRequest): Promise<boolean | undefined> {
    const result = await callPostRequest('/post', body);
    if (result.status === 201) {
        return true;
    }
}

export async function getDetailPost(postId: string): Promise<PostForCard | undefined> {
    const result = await callGetRequest(`/post/${postId}`);
    const data: PostForResponse = result.response;
    if (result.status === 200) {
        return {
            account: {
                avata: `${process.env.API_BASE_URL}${data.account.avata}`,
                id: data.account.id,
                name: data.account.fullName,
                nick_name: data.account.nickName
            },
            comment_recent:
                data.comment_recent
                    ?.map((item) => {
                        return {
                            account: item.account,
                            content: item.content,
                            created_at: item.created_at
                        };
                    })
                    .filter(Boolean) ?? [],
            content_text: data.contentText,
            created_at: formatDate(String(data.created_at), 'DD/MM/YYYY'),
            image_post: data.images?.map((item) => `${process.env.API_BASE_URL}${item.path}`) ?? [],
            is_like: data.is_liked ?? false,
            post_id: data.id,
            total_comment: data.totalComment,
            total_reaction: data.totalReaction,
            total_share: data.totalShare
        };
    }
}
