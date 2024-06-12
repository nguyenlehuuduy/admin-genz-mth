'use client';
import { notFound } from 'next/navigation';
import useSWR from 'swr';
import CreateNotificationPageView from './notifications-create-page-view';
import { TypeNotificationForCard, getAllTypeNotification } from '@/src/app/api/services/typeNotificationService';

async function getTypeNotification(): Promise<Array<TypeNotificationForCard> | undefined> {
  try {
    return await getAllTypeNotification();
  } catch (error) {
    console.error(error);
  }
}

const getData = async () => {
  const [listTypeNotification] = await Promise.all([getTypeNotification()]);
  return { listTypeNotification };
};

export default function CreateNotificationListPageDataFetcher() {
  const { data, error, isLoading } = useSWR('createNotificationPageData', () => getData());
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return <CreateNotificationPageView listTypeNotification={data.listTypeNotification ?? []} />
}
