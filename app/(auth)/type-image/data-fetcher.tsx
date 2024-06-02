'use client';
import { notFound } from 'next/navigation';
import useSWR from 'swr';
import { TypeImageForCard, getAllTypeImage } from '@/app/api/services/typeImageService';
import ListTypeImagePageView from './list-type-image-page-view';

async function getListTypeImage(): Promise<Array<TypeImageForCard> | undefined> {
    try {
        return await getAllTypeImage();
    } catch (error) {
        console.error(error);
    }
}

const getData = async () => {
    const [listTypeImage] = await Promise.all([getListTypeImage()]);
    return { listTypeImage };
};

export default function TabMenuListPageDataFetcher() {
    const { data, error, isLoading } = useSWR('getTypeImageListPageData', () => getData());
    if (error) {
        notFound();
    }
    if (isLoading || !data) {
        return <div>đang tải...</div>;
    }
    return <ListTypeImagePageView listTypeImage={data.listTypeImage ?? []} />;
}
