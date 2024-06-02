
import {
  callDeleteRequest,
  callGetRequest,
  callPostRequest,

} from "./apiService";
import { formatDate } from "@/app/ulti/ulti";
import { NotificationForCreate } from "@/app/api/types/notification/notificationForCreate";
import { NotificationForResponse } from "@/app/api/types/notification/notificationForResponse";


export type NotificationForCard = {
  id: string;
  message_notifications: string;
  type_notification_id: string;
  post_id: string;
  post_share_id: string;
  comment_id: string;
  follower_id: string;
  type_Notification: {
    id: string;
    thumbnail_Noti: string;
    type_Name: string;
    description: string;
  }
  created_at: string;
  updated_at: string;
  account: Array<{
    id: string,
    fullName: string,
  }>;
}
export type NotificationForCreateCard = {
  message_notifications: string;
  type_notification_id: string;
  post_id: string;
  post_share_id: string;
  comment_id: string;
  follower_id: string;
}
export async function getListNotification(): Promise<Array<NotificationForCard> | undefined> {
  const res = await callGetRequest(
    `/notifications/admin`,

  );
  if (res.status === 200) {
    const data: Array<NotificationForResponse> = res.response;
    const result: Array<NotificationForCard> = [];
    for (const item of data) {
      result.push({
        comment_id: item.commentId,
        message_notifications: item.messageNotifications,
        type_notification_id: item.typeNotificationId,
        id: item.id,
        post_id: item.postId,
        post_share_id: item.postShareId,
        follower_id: item.followerId,
        type_Notification: {
          id: item.id,
          thumbnail_Noti: item.typeNotification.thumbnailNoti,
          type_Name: item.typeNotification.typeName,
          description: item.typeNotification.description,
        },
        created_at: formatDate(item.created_at, "DD/MM/YYYY HH:mm"),
        updated_at: formatDate(item.updated_at, "DD/MM/YYYY HH:mm"),
        account: item.account
      })
    }
    return result
  }
}
export async function postNotification(body: NotificationForCreate): Promise<NotificationForCreateCard | undefined> {
  const result = await callPostRequest('/notifications', body);
  if (result.status === 201) {
    const data: NotificationForCreate = result.response;
    return {
      comment_id: data.commentId,
      message_notifications: data.messageNotifications,
      type_notification_id: data.typeNotificationId,
      post_id: data.postId,
      post_share_id: data.postShareId,
      follower_id: data.followerId,
    };
  }
}
export async function deleteNotification(id: string): Promise<boolean> {
  try {
    const result = await callDeleteRequest(`/notifications/${id}`);
    if (result.status === 200 || result.status === 204) {  // 204 No Content là mã trạng thái thông thường cho thành công DELETE
      return true;
    } else {
      console.error(`Lỗi khi xóa thông báo: ${result.status}`);
      return false;
    }
  } catch (error) {
    console.error('Lỗi khi xóa thông báo:', error);
    return false;
  }
}
