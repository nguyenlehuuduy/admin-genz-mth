'use client';
import { TypeNotificationForCard, getAllTypeNotification } from '@/app/api/services/typeNotificationService';
import { notFound } from 'next/navigation';
import useSWR from 'swr';
import ListTypeNotificationPageView from './list-type-noti-page-view';

async function getListTypeNotification(): Promise<Array<TypeNotificationForCard> | undefined> {
    try {
        return await getAllTypeNotification();
    } catch (error) {
        console.error(error);
    }
}

const getData = async () => {
    const [listTypeNotification] = await Promise.all([getListTypeNotification()]);
    return { listTypeNotification };
};

export default function TypeNotificationListPageDataFetcher() {
    const { data, error, isLoading } = useSWR('getTypeNotificationListPageData', () => getData());
    if (error) {
        notFound();
    }
    if (isLoading || !data) {
        return <div>đang tải...</div>;
    }
    return <ListTypeNotificationPageView listTypeNotification={data.listTypeNotification ?? []} />;
}
