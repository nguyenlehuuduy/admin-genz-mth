export type NotificationForResponse = {
    id: string;
    messageNotifications: string;
    typeNotificationId: string;
    accountId: string;
    postId: string;
    postShareId: string;
    commentId: string;
    typeNotification: {
        id: string;
        thumbnailNoti: string;
        typeName: string;
        description: string;
      }
    followerId: string;
    created_at: string;
    updated_at: string;
  };
