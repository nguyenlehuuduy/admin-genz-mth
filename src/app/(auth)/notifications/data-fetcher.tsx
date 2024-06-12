'use client';
import { notFound } from 'next/navigation';
import useSWR from 'swr';
import ListNotificationPageView from './list-notifications-page-view';
import { NotificationForCard, getListNotification } from '../../api/services/notificationService';

async function getNotification(): Promise<Array<NotificationForCard> | undefined> {
  try {
    return await getListNotification();
  } catch (error) {
    console.error(error);
  }
}

const getData = async () => {
  const [listNotification] = await Promise.all([getNotification()]);
  return { listNotification };
};

export default function NotificationListPageDataFetcher() {
  const { data, error, isLoading } = useSWR("getNotificationListPageData", () => getData());
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return <ListNotificationPageView listNotification={data.listNotification ?? []} />;
}
