'use client';
import { notFound } from 'next/navigation';
import useSWR from 'swr';
import ListTabMenuPageView from './list-tab-menu-page-view';
import { TabMenuForCard, getAllTabMenu } from '../../api/services/tabMenuService';

async function getListTabMenu(): Promise<Array<TabMenuForCard> | undefined> {
    try {
        return await getAllTabMenu();
    } catch (error) {
        console.error(error);
    }
}

const getData = async () => {
    const [listTabMenu] = await Promise.all([getListTabMenu()]);
    return { listTabMenu };
};

export default function TabMenuListPageDataFetcher() {
    const { data, error, isLoading } = useSWR('getTabMenuListPageData', () => getData());
    if (error) {
        notFound();
    }
    if (isLoading || !data) {
        return <div>đang tải...</div>;
    }
    return <ListTabMenuPageView listTabMenu={data.listTabMenu ?? []} />;
}