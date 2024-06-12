
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { PostForCard } from '../../api/services/postService';
import { PaginationAndFilter } from '../../api/types/pagination/pagination';

type ComponentProps = {
    listPost: Array<PostForCard>;
    pagination: PaginationAndFilter;
    sortBy?: string;
    orderBy?: 'asc' | 'desc';
    pageChange: (page: number, sortBy: string, orderBy: 'asc' | 'desc') => void;
};

export default function NewFeedTableView(props: ComponentProps) {
    const router = useRouter();
    const onPageChange = (event: DataTableStateEvent) => {
        const { page, sortField, sortOrder } = event;
        props.pageChange(Number(page) + 1, sortField, sortOrder === 1 ? 'asc' : 'desc');
    };

    const onSortChange = (event: DataTableStateEvent) => {
        const { sortField: field, sortOrder: order } = event;
        props.pageChange(props.pagination.pageNo!, field, order === 1 ? 'asc' : 'desc');
    };

    const imagePost = (data: PostForCard) => {
        const listImage = data.image_post.map((item, index) => <Image key={index} src={item} width={50} height={50} alt="image post" />);
        return listImage;
    };

    const accountInf = (data: PostForCard) => {
        return (
            <div>
                <p>{data.account.name}</p>
                <Image src={data.account.avata} width={50} height={50} alt="image account" />
            </div>
        );
    };

    const contentPost = (data: PostForCard) => {
        return <div className="whitespace-pre">{data.content_text}</div>;
    };

    return (
        <DataTable
            paginatorPosition="both"
            paginatorLeft
            lazy
            paginator
            first={(props.pagination.pageNo! - 1) * (props.pagination.limit ?? 1)}
            onPage={onPageChange}
            totalRecords={props.pagination.totalRecord}
            rows={props.pagination.limit}
            sortField={props.sortBy}
            sortOrder={props.orderBy === 'asc' ? 1 : -1}
            onSort={onSortChange}
            className="w-full"
            showGridlines
            value={props.listPost}
        >
            <Column align="center" style={{ width: '50px' }} sortable field="id" header="ảnh bài viết" body={imagePost} />
            <Column align="center" style={{ width: '150px' }} header="tài khoản" body={accountInf} />
            <Column style={{ width: '150px' }} sortable field="content_text" header="nội dung" body={contentPost} />
            <Column align="center" style={{ width: '150px' }} sortable field="created_at" header="ngày xuất bản" />
            <Column align="center" style={{ width: '150px' }} sortable field="total_reaction" header="lượt like" />
            <Column align="center" style={{ width: '150px' }} sortable field="total_comment" header="lượt comment" />
            <Column align="center" style={{ width: '150px' }} sortable field="total_share" header="lượt chia sẻ" />

            <Column
                align="center"
                header="tác vụ"
                style={{ width: '15%' }}
                body={(data: PostForCard) => (
                    <div className="flex gap-3">
                        <Button label="xem chi tiết" outlined onClick={() => router.push(`/new-feeds/${data.post_id}/detail`)} />
                        <Button label="báo cáo vi phạm" severity="warning" outlined />
                    </div>
                )}
            />
        </DataTable>
    );
}
