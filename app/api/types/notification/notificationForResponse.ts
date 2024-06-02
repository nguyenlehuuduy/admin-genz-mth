export type NotificationForResponse = {
  id: string;
  messageNotifications: string;
  typeNotificationId: string;
  postId: string;
  postShareId: string;
  commentId: string;
  typeNotification: {
    id: string;
    thumbnailNoti: string;
    typeName: string;
    description: string;
  },
  account: Array<{
    id: string,
    fullName: string,
  }>;
  followerId: string;
  created_at: string;
  updated_at: string;
};
