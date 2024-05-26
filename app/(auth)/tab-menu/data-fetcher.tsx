'use client';
import { TabMenuForCard, getAllTabMenu } from '@/app/api/services/tabMenuService';
import { notFound } from 'next/navigation';
import useSWR from 'swr';
import ListTabMenuPageView from './list-tab-menu-page-view';

async function getListFeatures(): Promise<Array<TabMenuForCard> | undefined> {
    try {
        return await getAllTabMenu();
    } catch (error) {
        console.error(error);
    }
}

const getData = async () => {
    const [listFeature] = await Promise.all([getListFeatures()]);
    return { listFeature };
};

export default function FeatureListPageDataFetcher() {
    const { data, error, isLoading } = useSWR('getFeatureListPageData', () => getData());
    if (error) {
        notFound();
    }
    if (isLoading || !data) {
        return <div>đang tải...</div>;
    }
    return <ListTabMenuPageView listTabMenu={data.listFeature ?? []} />;
}
