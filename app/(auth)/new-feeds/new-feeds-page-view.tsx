'use client';

import { PostForCard, getListPost } from '@/app/api/services/postService';
import { useEffect, useRef, useState } from 'react';
import NewFeedTableView from './new-feed-table';
import { convertObjectToQueryParams } from '@/app/ulti/ulti';
import { useRouter } from 'next/navigation';
import { PaginationAndFilter } from '@/app/api/types/pagination/pagination';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useSessionStorage } from 'primereact/hooks';
import { Toast } from 'primereact/toast';

type Condition = {
    limit?: number;
    pageNo?: number;
    sortBy?: string;
    orderBy?: 'asc' | 'desc';
    contentTextKey?: string;
    nameAccountKey?: string;
    emailAccountKey?: string;
    createdDateFrom?: string;
    createdDateTo?: string;
};
type PropsComponent = {
    condition: Condition;
};

const getListPostInitial = async (cond: Condition) => {
    try {
        const listPost = await getListPost(cond);
        return listPost;
    } catch (error) {
        console.error(error);
    }
};

export default function NewFeedPageView(props: PropsComponent) {
    const router = useRouter();
    const [condition, setCondition] = useState<Condition>(props.condition);
    const [listPost, setListPost] = useState<Array<PostForCard>>();
    const [currentPagination, setCurrentPagination] = useState<PaginationAndFilter>({
        pageNo: 1,
        limit: 5
    });

    useEffect(() => {
        const cond: Condition = props.condition;
        getListPostInitial(cond).then((rs) => {
            console.log(rs);
            console.log(cond);
            if (rs) {
                const { data, pagination } = rs;
                setListPost(data);
                setCurrentPagination(pagination);
            }
        });
        setCondition(cond);
    }, [props]);

    const onPageChange = (page: number, field: string, sort: 'asc' | 'desc' | undefined) => {
        updatePath({
            ...condition,
            pageNo: page,
            sortBy: field,
            orderBy: field ? sort : undefined
        });
    };

    const updatePath = (condition: Condition) => {
        const params = convertObjectToQueryParams(condition);
        router.push(`/new-feeds?${params}`);
    };
    const toast = useRef<Toast>(null);
    const [resultMessage, setResultMessage] = useSessionStorage("", "result-message");
    useEffect(() => {
        if (resultMessage) {
            toast.current?.show({
                severity: "info",
                summary: resultMessage,
            });
            setResultMessage("");
        }
    }, [resultMessage, setResultMessage]);

    return (
        <div>
            <div className="card">
                <Toast ref={toast} position="top-center" />
                <Button label="Tạo bài viết (quản trị)" severity="info" onClick={() => router.push('/new-feeds/create')} />
                <div className="mt-5 flex gap-4 align-items-center justify-content-center w-fit">
                    <span className="font-bold">Tìm kiếm theo</span>
                    <InputText id="name1" type="text" placeholder="content bài viết" />
                    <InputText id="name1" type="text" placeholder="tên tài khoản" />
                    <InputText id="name1" type="datetime-local" placeholder="ngày xuất bản" />
                    <Button label="tìm kiếm" icon="pi pi-search" />
                </div>
                <h5>Tất cả các bài viết hiện tại</h5>
                <NewFeedTableView listPost={listPost ?? []} pageChange={onPageChange} pagination={currentPagination} sortBy={condition.sortBy} orderBy={condition.orderBy} />
            </div>
        </div>
    );
}
